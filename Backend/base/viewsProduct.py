from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from .models import Product,Category
from .Serailizers import ProductSerializer
from rest_framework.response import Response

#admin
@api_view(['POST','DELETE','PATCH'])
@permission_classes([IsAdminUser])
def productAdmin(request,id=-1):
    if request.method == 'POST': 
        Product.objects.create(desc=request.data['desc'] ,cat_id_id=request.data['cat_id_id'],price=request.data['price'])
        return Response("product created")
    if request.method == 'DELETE': 
        prod_delete= Product.objects.get(_id = id)
        prod_delete.delete()
        return Response("Product deleted")
    if request.method == 'PATCH': 
        if int(id) > 0:
            prod = Product.objects.get(_id=id)
            if "cat_id_id" in request.data:
                prod.cat_id= Category.objects.get(_id = request.data["cat_id"])
            if "desc" in request.data:
                prod.desc=request.data["desc"]
            if "price" in request.data:
                prod.price=request.data["price"]
            prod.save()
            return Response("Product updated")
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