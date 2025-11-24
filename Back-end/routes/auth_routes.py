from flask import Blueprint, request
from database.models import db, User
from utils.response_builder import build_response
from utils.error_handlers import handle_error

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    """POST /auth/register - Registra um novo usuário (ong ou adotante)."""
    try:
        data = request.get_json() or {}
        required = ["name", "email", "password", "role"]
        if not all(f in data and data[f] for f in required):
            return build_response(False, "Campos obrigatórios faltando"), 400

        if data["role"] not in ("ong", "adotante"):
            return build_response(False, "Role inválida"), 400

        # Verifica email único
        if User.query.filter_by(email=data["email"]).first():
            return build_response(False, "E-mail já cadastrado"), 409

        user = User(
            name=data["name"],
            email=data["email"],
            role=data["role"],
        )
        user.set_password(data["password"])
        db.session.add(user)
        db.session.commit()

        return build_response(True, "Usuário registrado com sucesso", user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return handle_error(e, "Erro ao registrar usuário")

@auth_bp.route("/login", methods=["POST"])
def login():
    """POST /auth/login - Realiza login simples (sem JWT)."""
    try:
        data = request.get_json() or {}
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        if not email or not password or not role:
            return build_response(False, "Credenciais incompletas"), 400

        user = User.query.filter_by(email=email, role=role).first()
        if not user or not user.check_password(password):
            return build_response(False, "Credenciais inválidas"), 401

        return build_response(True, "Login realizado com sucesso", user.to_dict()), 200
    except Exception as e:
        return handle_error(e, "Erro ao realizar login")
