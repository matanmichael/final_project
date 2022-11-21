from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from .models import Category
from .Serailizers import CategorySerializer
from rest_framework.response import Response

#admin
@api_view(['POST','DELETE','PUT'])
@permission_classes([IsAdminUser])
def categoryAdmin(request,id=-1):
    if request.method == 'POST': 
        Category.objects.create(desc=request.data['desc'])
        return Response("Category added")
    if request.method == 'DELETE': 
        cat_delete= Category.objects.get(_id = id)
        cat_delete.delete()
        return Response("Category deleted")
    if request.method == 'PUT': 
        category_update=Category.objects.get(_id = id)
        category_update.desc =request.data['desc']
        category_update.save()
        return Response("Category updated")

#web user
@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)