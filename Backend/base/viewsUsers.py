from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
\

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['staff'] = user.is_staff
        token['admin'] = user.is_superuser
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    try:
        is_admin= request.data["admin"]
        is_staff= request.data["staff"]
    except:
        is_admin=0
        is_staff=0
    print(request)
    User.objects.create_user(username= request.data["username"],email=request.data["email"],password=request.data["password"],is_superuser=is_admin,is_staff=is_staff)
    return Response("Registration done")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myLogout(request):
    logout(request)
    return Response("logout succeded")

