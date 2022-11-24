from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from .models import Product,Category
from .Serailizers import ProductSerializer
from rest_framework.response import Response

#admin
@api_view(['POST','DELETE','PUT'])
@permission_classes([IsAdminUser])
def productAdmin(request,id=0):
    if request.method == 'POST': 
        Product.objects.create(desc=request.data['desc'] ,cat_id_id=request.data['cat_id_id'],price=request.data['price'])
        return Response("product created")
    if request.method == 'DELETE': 
        prod_delete= Product.objects.get(_id = id)
        prod_delete.delete()
        return Response("Product deleted")
    if request.method == 'PUT': 
        product_update=Product.objects.get(_id = id)
        product_update.desc =request.data['desc']
        product_update.price =request.data['price']
        product_update.save()
        return Response({'PUT SUCCESS': id})

#web user
@api_view(['GET'])
def getProductsPerCategoty(request, id=0):
    if int(id) > 0: 
        prod = Product.objects.filter(cat_id_id=int(id))
    else:  
        prod = Product.objects.all()
    serializer = ProductSerializer(prod, many=True)      
    return Response(serializer.data)

        

@api_view(['GET'])
def getAllProducts(request): 
    products= Product.objects.all()
    print(products)
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)