from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User
# Create your models here.


class Car(models.Model):

    GEAR = (
        ('a', 'automatic'),
        ('m', 'manuel')
    )

    plate_number = models.CharField(max_length = 15, unique = True)
    brand = models.CharField(max_length = 15)
    model = models.CharField(max_length = 20)
    rent_per_day = models.DecimalField(

        # max_digits = We specify how many digits the number will have at most.
        # max_digits = Sayının en fazla kaç haneli olacağını belirtiriz.
        max_digits = 6,  

        # decimal_places = We specify the maximum number of digits after the comma.
        # decimal_places = Virgülden sonra maksimum basamak sayısını belirtiyoruz.
        decimal_places = 2,  
        
        # MinValueValidator = We specify the minimum number to be entered in this field, not less than the number we specified.
        # MinValueValidator = Belirttiğimiz sayıdan az olmamak üzere bu alana girilecek minimum sayıyı belirtiyoruz.
        validators = [MinValueValidator(50)],  
    )
    gear = models.CharField(max_length = 1, choices = GEAR)
    year = models.SmallIntegerField()
    availability = models.BooleanField(default = True)

    def __str__(self):
        return f" {self.plate_number} {self.model} {self.brand} "
    

class Reservation(models.Model):

    customer = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'customers')
    car = models.ForeignKey(Car, on_delete = models.CASCADE, related_name = 'cars')
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.customer} {self.car}"
    
    #! A user can only book one car on the same dates:
    #! Bir kullanıcı aynı tarihlerde yalnızca bir araba rezervasyonu yapabilir:

    class Meta:
        #! Modeller bölümünde customer, start_date ve end_date alanlarını unique olarak olmalı:
        unique_together = ['customer', 'start_date', 'end_date']
