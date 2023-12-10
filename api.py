from flask import Flask, jsonify, request
from pymongo import MongoClient
import jwt
from datetime import datetime, timedelta
from bcrypt import hashpw, gensalt
from flask_cors import CORS  # Para problemas de CORS

app = Flask(__name__)
CORS(app)  # para problemas de CORS

app.config['SECRET_KEY'] = 'your-secret-key'
conex = MongoClient("mongodb://127.0.0.1:27017")  # host uri
bd = conex.MyDB  # Select the database
negocios = bd.negocios  # Select the collection name
pedidos = bd.pedidos  # Select the collection name
usuarios = bd.usuarios  # Select the collection name


# Función para generar el token JWT
def generate_token(user_id):
  expiration_time = datetime.utcnow() + timedelta(hours=1)
  payload = {'user_id': user_id, 'exp': expiration_time}
  token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
  return token


@app.route('/registrar', methods=['POST'])
def registrar():
  data = request.get_json()
  existing_user = usuarios.find_one({'username': data['username']})
  if existing_user:
    return jsonify({'error': 'El usuario ya existe'}), 400

  hashed_password = hashpw(data['password'].encode('utf-8'), gensalt())

  new_user = {
    "_id": data['_id'],
    'username': data['username'],
    'password': hashed_password,
    'email': data['email']
  }
  usuarios.insert_one(new_user)
  return jsonify({'message': 'Usuario registrado exitosamente'})


@app.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = usuarios.find_one({'username': data['username']})

  # Verificar si el usuario existe y la contraseña es correcta
  if user and hashpw(data['password'].encode('utf-8'), user['password']) == user['password']:
    user_id = user['_id']
    token = generate_token(user_id)
    return jsonify({'token': token})

  return jsonify({'error': 'Credenciales incorrectas'}), 401


@app.route('/negocios', methods=['GET'])
def get_negocios():
  # Verificar el token antes de permitir el acceso a esta ruta
  token = request.headers.get('Authorization')
  print(token)
  #token = str.replace(str(data), 'Bearer ', '')

  try:
    jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': 'Token expirado'}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': 'Token inválido'}), 401

  return list(negocios.find())


@app.route('/negocios/<int:id>', methods=['GET'])
def get_negocio(id):
  return negocios.find_one({"_id": id})


# Ruta protegida que requiere autenticación con el token JWT
@app.route('/negocios/<int:id>/productos', methods=['GET'])
def get_productos(id):
  # Verificar el token antes de permitir el acceso a esta ruta
  data = request.headers.get('Authorization')
  token = str.replace(str(data), 'Bearer ', '')
  try:
    jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': 'Token expirado'}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': 'Token inválido'}), 401

  # Lógica para obtener productos
  return jsonify(negocios.find_one({"_id": id})['Productos'])


# @app.route('/negocios/<int:id>/productos', methods = ['GET'])
# def get_productos(id):
#   return negocios.find_one({"_id": id})['Productos']

@app.route('/dnegocio/<int:id>/producto/<int:codProd>', methods=['GET'])
def get_producto(id, codProd):
  producto = negocios.find_one({"Productos.codProd": codProd}, {"_id": 0, "Productos.$": 1})
  if producto and 'Productos' in producto:
    return jsonify(producto['Productos'][0])


@app.route('/negocios/<int:id>/productos', methods=['POST'])
def insert_pedido(id):
  carrito = request.values.get("carrito")
  total = 0
  pedidos.insert_one(
    {"_id": 1, "estadoPed": "pendiente", "montoTotal": total, "negocioId": id,
     "productos": carrito})
  return "Insertado Existosamente"

@app.route('/producto/<int:codProd>', methods= ['DELETE'])
def delete_product(codProd):
  print("api recibe:", codProd)
  negocios.update_one({"_id":1}, {"$pull": {"Productos": {"codProd": codProd}}})
  return jsonify({"mensaje": "Producto eliminado exitosamente"})


if __name__ == '__main__':
  app.run(debug=True, port=8000)
