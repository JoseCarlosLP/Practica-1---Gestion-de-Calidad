from flask import Flask, jsonify, request
from pymongo import MongoClient
import jwt
from datetime import datetime, timedelta,timezone
from bcrypt import hashpw, gensalt
from flask_cors import CORS  # Para problemas de CORS
from dotenv import load_dotenv #Para usar .env
import os
app = Flask(__name__)
CORS(app)  # para problemas de CORS

app.config['APP_CONFIG'] = os.getenv('APP_CONFIG')
conex = MongoClient(os.getenv('DATABASE_URL'))

bd = conex.MyDB  # Select the database
negocios = bd.negocios  # Select the collection name
pedidos = bd.pedidos  # Select the collection name
usuarios = bd.usuarios  # Select the collection name

TOKEN_TYPE = 'Bearer '

def obtener_maximo_id(coleccion):
  resultado = bd[coleccion].aggregate([
    {"$group": {"_id": None, "max_id": {"$max": "$_id"}}}
  ])
  max_id = next(resultado, {}).get("max_id", 0)
  print(max_id)
  siguiente_id = max_id + 1
  return siguiente_id


# Función para generar el token JWT
def generate_token(user_id):
  expiration_time = datetime.now(timezone.utc) + timedelta(hours=1)
  payload = {'user_id': user_id, 'exp': expiration_time}
  token = jwt.encode(payload, app.config['APP_CONFIG'], algorithm='HS256')
  return token


@app.route('/registrar', methods=['POST'])
def registrar():
  data = request.get_json()
  existing_user = usuarios.find_one({'username': data['username']})
  if existing_user:
    return jsonify({'error': 'El usuario ya existe'}), 400

  hashed_password = data['password'].encode('utf-8')
  new_user = {
    "_id": obtener_maximo_id("usuarios"),
    'username': data['username'],
    'password': hashed_password,
    'email': data['email'],
    'tipo': 0
  }
  usuarios.insert_one(new_user)
  return jsonify({'message': 'Usuario registrado exitosamente'})


@app.route('/registrarN', methods=['POST'])
def registrar_negocio():
  data = request.get_json()
  existing_neg = negocios.find_one({'Nombre': data['Nombre']})
  if existing_neg:
    return jsonify({'error': 'El negocio ya existe'}), 400

  hashed_password = data['password'].encode('utf-8')
  max_id = obtener_maximo_id("usuarios")
  new_user = {
    "_id": max_id,  # Consultar aqui en la base de datos cual es el id mas alto
    'username': data['AdminName'],
    'password': hashed_password,
    'email': data['email'],
    'tipo': 1
  }
  usuarios.insert_one(new_user)

  new_neg = {
    "_id": obtener_maximo_id("negocios"),
    'Nombre': data['Nombre'],
    'Categoria': data['Categoria'],
    'Imagen': "",
    'idAdmin': max_id,
    'Productos': []
  }
  negocios.insert_one(new_neg)
  return jsonify({'message': 'Usuario registrado exitosamente'})


@app.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  user = usuarios.find_one({'username': data['userOrAdminName']})

  if user and data['password'].encode('utf-8')== user[
    'password']:  # Verificamos la contraseña
    user_id = user['_id']
    token = generate_token(user_id)
    if user['tipo'] == 0:
      return jsonify({'token': token, 'idUsu': user['_id'], 'idNeg': -1})
    else:
      neg = negocios.find_one({'idAdmin': user['_id']})
      return jsonify({'token': token, 'idNeg': neg['_id']})

  return jsonify({'error': 'Credenciales incorrectas'}), 401


@app.route('/negocios', methods=['GET'])
def get_negocios():
  # Verificar el token antes de permitir el acceso a esta ruta
  data = request.headers.get('Authorization')
  print(data)
  token = str.replace(str(data), TOKEN_TYPE, '')

  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': 'Token expirado'}), 401
  except jwt.InvalidTokenError:
    print(jwt.InvalidTokenError)
    return jsonify({'error': 'Token inválido'}), 401

  return list(negocios.find())


@app.route('/negocios/<int:id>', methods=['GET'])
def get_negocio(id):
  data = request.headers.get('Authorization')
  print(data)
  token = str.replace(str(data), TOKEN_TYPE, '')

  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': 'Token expirado'}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': 'Token inválido'}), 401

  return negocios.find_one({"_id": id})


@app.route('/negocios/<int:id>/productos', methods=['GET'])
def get_productos(id):
  data = request.headers.get('Authorization')
  token = str.replace(str(data), TOKEN_TYPE, '')
  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': 'Token expirado'}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': 'Token inválido'}), 401

  return jsonify(negocios.find_one({"_id": id})['Productos'])


@app.route('/dnegocio/<int:id>/producto/<int:codProd>', methods=['GET'])
def get_producto(id, codProd):
  producto = negocios.find_one({"_id": id, "Productos.codProd": codProd}, {"_id": 0, "Productos.$": 1})
  if producto and 'Productos' in producto:
    return jsonify(producto['Productos'][0])


@app.route('/registrarPedido', methods=['POST'])
def insert_pedido():
  data=request.get_json()
  pedidos.insert_one(
    {"_id": obtener_maximo_id('pedidos'), "estadoPed": "pendiente", "montoTotal": data["total"], "negocioId": data["idNeg"],"UserId": data["idUser"],
     "productos": data["productos"]})
  return jsonify({"mensaje": "Pedido Insertado Exitosamente"})

@app.route('/pedidosCliente/<int:idCliente>', methods=['GET'])
def get_pedidos_cliente(idCliente):
  data = request.headers.get('Authorization')
  token = str.replace(str(data), TOKEN_TYPE, '')
  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': 'Token expirado'}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': 'Token inválido'}), 401

  return jsonify(list(pedidos.find({"UserId": idCliente})))

@app.route('/pedidosNegocio/<int:idNegocio>', methods=['GET'])
def get_pedidos_negocio(idNegocio):
  data = request.headers.get('Authorization')
  token = str.replace(str(data), TOKEN_TYPE, '')
  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': 'Token expirado'}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': 'Token inválido'}), 401

  return jsonify(list(pedidos.find({"negocioId": idNegocio})))

@app.route("/pedidosNegocio",  methods=['POST'])
def actualizar_estado_pedido():
  data = request.get_json()
  pedidos.update_one({'_id': data['idPedido']}, {"$set": {"estadoPed": "finalizado" }})
  return jsonify({"mensaje": "Estado actualizado exitosamente"})



@app.route('/producto/<int:codProd>/<int:idNeg>', methods= ['DELETE'])
def delete_product(idNeg,codProd):
  print("api recibe:", codProd, idNeg)
  negocios.update_one({"_id": idNeg}, {"$pull": {"Productos": {"codProd": codProd}}})
  return jsonify({"mensaje": "Producto eliminado exitosamente"})


@app.route('/actualizar/<int:NegId>', methods= ['POST'])
def update_product(NegId):
  data = request.get_json()
  producto = {
    "Productos.$.codProd": data['codProd'],
    'Productos.$.Nombre': data['Nombre'],
    'Productos.$.Descripcion': data['Descripcion'],
    'Productos.$.Categoria': data['Categoria'],
    'Productos.$.Precio': data['Precio'],
    'Productos.$.Imagen': data['Imagen'],
  }
  negocios.update_one({"_id":NegId,"Productos.codProd":data["codProd"]}, {"$set":producto},upsert=True)
  return jsonify({"mensaje": "Actualizado Exitosamente"})


@app.route('/insertarProducto/<int:NegId>', methods= ['POST'])
def insert_product(NegId):
  data = request.get_json()
  existing_product = negocios.find_one({'_id':NegId,'Productos.codProd':data['codProd']})
  if existing_product:
    return jsonify({'error': 'El producto ya existe'}), 400

  producto = {
    "Productos":{
      "codProd": data['codProd'],
      'Nombre': data['Nombre'],
      'Descripcion': data['Descripcion'],
      'Categoria': data['Categoria'],
      'Precio': data['Precio'],
      'Imagen': data['Imagen'],
    }
  }
  negocios.update_one({"_id":NegId},{"$push":producto})
  return jsonify({"mensaje": "Actualizado Exitosamente"})

@app.route('/Usuario/<int:idUser>', methods=['GET'])
def get_usuario(idUser):
    print(f"Solicitud para /Usuario/{idUser}")
    usuario = usuarios.find_one({"_id": idUser})
    usuario['password']=usuario['password'].decode('utf-8')
    print(f"Usuario encontrado: {usuario}")
    return usuario
@app.route('/ActualizarUsuario/<int:idUser>', methods=['POST'])
def update_usuario(idUser):
    print(f"Solicitud para /ActualizarUsuario/{idUser}")
    data=request.get_json()
    hashed_password = data['password'].encode('utf-8')
    usuarios.update_one({"_id": idUser}, {"$set":{"username":data['username'],"email":data['email'],"password":hashed_password}})
    return jsonify({"mensaje": "Actualizado Exitosamente"})

if __name__ == '__main__':
  app.run(debug=True, port=8000)
