import pytest
from .models import BaseModel


@pytest.mark.parametrize(
    "model, field_name, is_unique",
    [
        (BaseModel, "id", True),
        (BaseModel, "created_date", False),
        (BaseModel, "last_updated", False),
    ],
)
def test_model_structure_unique_fields(model, field_name, is_unique):
    field = model._meta.get_field(field_name)
    assert field.unique == is_unique, f"Field '{field_name}' uniqueness mismatch"
