from flask import Flask,jsonify,request
from pymongo import MongoClient
from flask_cors import CORS #Para problemas de CORS
app = Flask(__name__)
CORS(app) #para problemas de CORS
conex = MongoClient("mongodb://127.0.0.1:27017") #host uri
bd = conex.MyDB   #Select the database
negocios = bd.negocios #Select the collection name
pedidos = bd.pedidos #Select the collection name
#clientes = bd.clientes #Select the collection name

@app.route('/negocios', methods = ['GET'])
def get_negocios():
    return list(negocios.find())

@app.route('/negocios/<int:id>', methods = ['GET'])
def get_negocio(id):
    return negocios.find_one({"_id": id})

@app.route('/negocios/<int:id>/productos', methods = ['GET'])
def get_productos(id):
    return negocios.find_one({"_id": id})['Productos']

@app.route('/dnegocio/<int:id>/producto/<int:codProd>',methods=['GET'])
def get_producto(id,codProd):
    producto = negocios.find_one({"Productos.codProd": codProd}, {"_id": 0, "Productos.$": 1})
    if producto and 'Productos' in producto:
        return jsonify(producto['Productos'][0])

@app.route('/negocios/<int:id>/productos', methods = ['POST'])
def insert_pedido(id):
    carrito = request.values.get("carrito")
    total = 0
    pedidos.insert_one(
        {"_id": 1, "estadoPed": "pendiente", "montoTotal": total, "negocioId": id,
         "productos": carrito})
    return "Insertado Existosamente"

if __name__ == '__main__':
    app.run(debug=True, port=8000)
