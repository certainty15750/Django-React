from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

from . import models
from . import serializers


class GetMeView(APIView):
    def get(self, request):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        user = request.user
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return Response({
            'token': token,
            'user_id': user.pk,
            'email': user.email
        })


class UserListView(generics.ListCreateAPIView):
    """
    DRF’s generic ListCreateAPIView.
    More detail:
        https://wsvincent.com/django-rest-framework-user-authentication-tutorial/
    """
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


class UpdateUserStatus(APIView):
    """
    Enable/Disable user status.
    """
    def get_object(self, info):
        try:
            user = models.CustomUser.objects.get(email=info['email'])
        except:
            return None
        if user:
            return user
        else:
            return None

    def put(self, request, format=None):
        user = self.get_object(request.data)
        if user:
            serializer = serializers.UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        raise Response({}, status=status.HTTP_400_BAD_REQUEST)


class CreateUser(APIView):
    permission_classes = (AllowAny,)
    """
    Saving user.
    """
    def get_object(self, info):
        try:
            user = models.CustomUser.objects.get(email=info['email'])
        except:
            return None
        if user:
            return user
        else:
            return None

    def post(self, request, format=None):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        user = self.get_object(request.data)
        if user:
            # token = Token.objects.create(user=user)
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({
                'token': token,
                'user_id': user.pk,
                'email': user.email
            })
        else:
            serializer = serializers.UserSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                user = self.get_object(serializer.data)
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                return Response({
                    'token': token,
                    'user_id': user.pk,
                    'email': user.email
                })

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
