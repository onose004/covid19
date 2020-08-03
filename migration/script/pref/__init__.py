from ._base import BaseDataloader
from .aichi import *
from .gifu import *
from .mie import *

dataloader = {
    "aichi": Aichi(),
    # "gifu": Gifu(),
    # "mie": Mie()
    }
