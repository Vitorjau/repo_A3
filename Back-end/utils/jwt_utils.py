import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from datetime import datetime, timedelta
from functools import wraps
from flask import request, current_app, g
from database.models import User
from utils.response_builder import build_response

TOKEN_EXP_MINUTES = 60  # 1 hora

def generate_token(user: User) -> str:
    """Gera um JWT para o usuário."""
    payload = {
        "sub": user.id,
        "role": user.role,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXP_MINUTES)
    }
    secret = current_app.config.get("SECRET_KEY")
    return jwt.encode(payload, secret, algorithm="HS256")

def decode_token(token: str) -> dict:
    """Decodifica um token JWT e retorna o payload ou lança erro."""
    secret = current_app.config.get("SECRET_KEY")
    return jwt.decode(token, secret, algorithms=["HS256"])

def token_required(role: str | None = None):
    """Decorator para exigir JWT válido. Opcionalmente exigir role específica."""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get("Authorization", "")
            if not auth_header.startswith("Bearer "):
                return build_response(False, "Token ausente ou formato inválido"), 401
            token = auth_header.split(" ", 1)[1].strip()
            try:
                payload = decode_token(token)
                user = User.query.get(payload.get("sub"))
                if not user:
                    return build_response(False, "Usuário não encontrado"), 401
                if role and user.role != role:
                    return build_response(False, "Permissão insuficiente"), 403
                # Disponibiliza usuário no contexto
                g.current_user = user
            except ExpiredSignatureError:
                return build_response(False, "Token expirado"), 401
            except InvalidTokenError:
                return build_response(False, "Token inválido"), 401
            except Exception:
                return build_response(False, "Falha na autenticação"), 401
            return f(*args, **kwargs)
        return wrapper
    return decorator
