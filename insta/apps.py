from django.apps import AppConfig


class InstaConfig(AppConfig):
    name = 'insta'

    def ready(self):
        import insta.signals
       