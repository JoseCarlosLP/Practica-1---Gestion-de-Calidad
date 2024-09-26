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
TOKEN_EXPIRADO = "Token expirado"
TOKEN_INVALIDO = "Token inválido"

MENSAJE_ACTUALIZADO = "Actualizado Exitosamente"

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
      return jsonify({'token': token, 'idUsu': user['_id'], 'id_neg': -1})
    else:
      neg = negocios.find_one({'idAdmin': user['_id']})
      return jsonify({'token': token, 'id_neg': neg['_id']})

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
    return jsonify({'error': TOKEN_EXPIRADO}), 401
  except jwt.InvalidTokenError:
    print(jwt.InvalidTokenError)
    return jsonify({'error': TOKEN_INVALIDO}), 401

  return list(negocios.find())


@app.route('/negocios/<int:id>', methods=['GET'])
def get_negocio(id):
  data = request.headers.get('Authorization')
  print(data)
  token = str.replace(str(data), TOKEN_TYPE, '')

  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': TOKEN_EXPIRADO}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': TOKEN_INVALIDO}), 401

  return negocios.find_one({"_id": id})


@app.route('/negocios/<int:id>/productos', methods=['GET'])
def get_productos(id):
  data = request.headers.get('Authorization')
  token = str.replace(str(data), TOKEN_TYPE, '')
  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': TOKEN_EXPIRADO}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': TOKEN_INVALIDO}), 401

  return jsonify(negocios.find_one({"_id": id})['Productos'])


@app.route('/dnegocio/<int:id>/producto/<int:cod_prod>', methods=['GET'])
def get_producto(id, cod_prod):
  producto = negocios.find_one({"_id": id, "Productos.cod_prod": cod_prod}, {"_id": 0, "Productos.$": 1})
  if producto and 'Productos' in producto:
    return jsonify(producto['Productos'][0])


@app.route('/registrarPedido', methods=['POST'])
def insert_pedido():
  data=request.get_json()
  pedidos.insert_one(
    {"_id": obtener_maximo_id('pedidos'), "estadoPed": "pendiente", "montoTotal": data["total"], "negocioId": data["id_neg"],"UserId": data["id_user"],
     "productos": data["productos"]})
  return jsonify({"mensaje": "Pedido Insertado Exitosamente"})

@app.route('/pedidosCliente/<int:id_cliente>', methods=['GET'])
def get_pedidos_cliente(id_cliente):
  data = request.headers.get('Authorization')
  token = str.replace(str(data), TOKEN_TYPE, '')
  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': TOKEN_EXPIRADO}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': TOKEN_INVALIDO}), 401

  return jsonify(list(pedidos.find({"UserId": id_cliente})))

@app.route('/pedidosNegocio/<int:id_negocio>', methods=['GET'])
def get_pedidos_negocio(id_negocio):
  data = request.headers.get('Authorization')
  token = str.replace(str(data), TOKEN_TYPE, '')
  try:
    jwt.decode(token, app.config['APP_CONFIG'], algorithms=['HS256'])
  except jwt.ExpiredSignatureError:
    return jsonify({'error': TOKEN_EXPIRADO}), 401
  except jwt.InvalidTokenError:
    return jsonify({'error': TOKEN_INVALIDO}), 401

  return jsonify(list(pedidos.find({"negocioId": id_negocio})))

@app.route("/pedidosNegocio",  methods=['POST'])
def actualizar_estado_pedido():
  data = request.get_json()
  pedidos.update_one({'_id': data['idPedido']}, {"$set": {"estadoPed": "finalizado" }})
  return jsonify({"mensaje": "Estado actualizado exitosamente"})



@app.route('/producto/<int:cod_prod>/<int:id_neg>', methods= ['DELETE'])
def delete_product(id_neg,cod_prod):
  print("api recibe:", cod_prod, id_neg)
  negocios.update_one({"_id": id_neg}, {"$pull": {"Productos": {"cod_prod": cod_prod}}})
  return jsonify({"mensaje": "Producto eliminado exitosamente"})


@app.route('/actualizar/<int:neg_id>', methods= ['POST'])
def update_product(neg_id):
  data = request.get_json()
  producto = {
    "Productos.$.cod_prod": data['cod_prod'],
    'Productos.$.Nombre': data['Nombre'],
    'Productos.$.Descripcion': data['Descripcion'],
    'Productos.$.Categoria': data['Categoria'],
    'Productos.$.Precio': data['Precio'],
    'Productos.$.Imagen': data['Imagen'],
  }
  negocios.update_one({"_id":neg_id,"Productos.cod_prod":data["cod_prod"]}, {"$set":producto},upsert=True)
  return jsonify({"mensaje": MENSAJE_ACTUALIZADO})


@app.route('/insertarProducto/<int:neg_id>', methods= ['POST'])
def insert_product(neg_id):
  data = request.get_json()
  existing_product = negocios.find_one({'_id':neg_id,'Productos.cod_prod':data['cod_prod']})
  if existing_product:
    return jsonify({'error': 'El producto ya existe'}), 400

  producto = {
    "Productos":{
      "cod_prod": data['cod_prod'],
      'Nombre': data['Nombre'],
      'Descripcion': data['Descripcion'],
      'Categoria': data['Categoria'],
      'Precio': data['Precio'],
      'Imagen': data['Imagen'],
    }
  }
  negocios.update_one({"_id":neg_id},{"$push":producto})
  return jsonify({"mensaje": MENSAJE_ACTUALIZADO})

@app.route('/Usuario/<int:id_user>', methods=['GET'])
def get_usuario(id_user):
    print(f"Solicitud para /Usuario/{id_user}")
    usuario = usuarios.find_one({"_id": id_user})
    usuario['password']=usuario['password'].decode('utf-8')
    print(f"Usuario encontrado: {usuario}")
    return usuario
@app.route('/ActualizarUsuario/<int:id_user>', methods=['POST'])
def update_usuario(id_user):
    print(f"Solicitud para /ActualizarUsuario/{id_user}")
    data=request.get_json()
    hashed_password = data['password'].encode('utf-8')
    usuarios.update_one({"_id": id_user}, {"$set":{"username":data['username'],"email":data['email'],"password":hashed_password}})
    return jsonify({"mensaje": MENSAJE_ACTUALIZADO})

if __name__ == '__main__':
  app.run(debug=True, port=8000)
