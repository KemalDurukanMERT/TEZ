from rest_framework import serializers

from .models import Car, Reservation

class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = (
            'id',
            'plate_number',
            'brand',
            'model',
            'year',
            'gear',
            'rent_per_day',
            'availability',
        )
    
    #! In CarSerializers, we do not need to send the availability field to the customers in the data returned, there are two different ways for this:
    #? 1- Creating a separate serailzer for customers
    #? 2- Override the get_fields method
    #! CarSerializers'da dönen verilerde kullanılabilirlik alanını müşterilere göndermemize gerek yoktur, bunun için iki farklı yol vardır:
    #? 1- Müşteriler için ayrı bir serailzer oluşturmak
    #? 2- get_fields yöntemini geçersiz kıl

    def get_fields(self):

        fields = super().get_fields()  # We access the fields in class Meta # Meta classındaki fields erişiyoruz
        request = self.context.get('request')
        if request.user and not request.user.is_staff:
            fields.pop('availability')
        return fields


class ReservationSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    customer = serializers.StringRelatedField(read_only=True)
    customer_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Reservation
        fields = (
            'id',
            'customer',
            'customer_id',
            'car',
            'start_date',
            'end_date',
            'total_price',
        )

    def create(self, validated_data):
        validated_data['customer_id'] = self.context['request'].user.id
        reservation = Reservation.objects.create(**validated_data)
        reservation.save()
        return reservation

    def get_total_price(self, obj):
        return obj.car.rent_per_day * (obj.end_date - obj.start_date).days