
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from .serializers import RegisterSerializer, UserSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(UserSerializer(user).data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        try :
            serializer.is_valid(raise_exception=True)

        except Exception as e:
            return Response({"detail": f"Invalid credentials {e}"}, status=status.HTTP_401_UNAUTHORIZED)

        tokens =serializer.validated_data
        access =tokens.get('access')
        refresh = tokens.get('refresh')

        response = Response({'access':access},status=status.HTTP_200_OK)

        cookie_max_age = int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())
        response.set_cookie(
            key='refresh',
            value=refresh,
            httponly=True,
            secure=False,  # True in production (HTTPS)
            samesite='Lax',  # or 'Strict'
            max_age=cookie_max_age,
            path='/'  # cookie path (accessible on /api/token/refresh/ too)
        )
        return response

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_access_token(request):
    refresh_token = request.COOKIES.get('refresh')
    if not refresh_token:
        return Response({'details':"Refresh token not provided."},status=status.HTTP_401_UNAUTHORIZED)

    try:
        token = RefreshToken(refresh_token)
        new_access = str(token.access_token)
        return Response({'access':new_access},status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": f"Invalid refresh token {e}"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def permitted_view(request):
    return Response({'message':f"Hello,{request.user.username} — you are authenticated!"},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    response = Response({'Detail':'Logout Successfully'},status=status.HTTP_200_OK)

    response.delete_cookie('refresh','/')
    return response









