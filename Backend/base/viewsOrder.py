from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .Serailizers import OrderSerializer,Order_detailSerializer
from .models import Order, Order_detail, Product
from rest_framework.response import Response

#admin
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrderDetails(request, id=0):
    order_id = Order.objects.get(_id=id)
    orderDetails=Order_detail.objects.get(order_id=order_id)
    serializer = Order_detailSerializer(orderDetails, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteOrder(request, id=0):
    if int(id) > 0:
        order = Order.objects.get(_id=id)
        order.delete()
        return Response("Order deleted")
    else:
        order = Order.objects.all()
        order.delete()
        return Response("All orders has been deleted")

@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updateOrderDetail(request, id=0):
    if int(id) > 0:
        orderDetail=Order_detail.objects.get(_id=id)
        if "product_id" in request.data:
            orderDetail.product_id=request.data["product_id"]
        if "amount" in request.data:
            orderDetail.quantity=request.data["amount"]

        orderDetail.save()
        return Response("Order updated")
    else: 
        return Response("Order to update was not selected")

#customer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrdersForUser(request):
    user = request.user
    userOrders= user.order_set.all()
    serializer = OrderSerializer(userOrders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderDetails(request, id=0):
    order_id = Order.objects.get(_id=id)
    orderDetails=Order_detail.objects.filter(order_id=order_id)
    print(orderDetails)
    serializer = Order_detailSerializer(orderDetails, many=True)
    return Response(serializer.data)
   
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    orders=request.data
    newOrder= Order.objects.create(user_id=request.user,total=1)
    for x in orders:
        newProd=Product.objects.get(_id=x["_id"])
        total=newProd.price * x["amount"]
        Order_detail.objects.create(order_id=newOrder,prod_id=newProd,amount=x["amount"],total=total)
    return Response("product was create successfully")