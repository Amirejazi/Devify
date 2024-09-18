import pytest
from ...models import CourseCategory
from django.db import models


## Validate the existence of expected columns in each table, ensuring correct data types.
@pytest.mark.parametrize(
    "model, field_name, expected_type",
    [
        (CourseCategory, "title", models.CharField),
        (CourseCategory, "slug", models.SlugField),
        (CourseCategory, "is_active", models.BooleanField),

    ],
)
def test_model_structure_column_data_types(model, field_name, expected_type):
    assert hasattr(
        model, field_name
    ), f"{model.__name__} model does not have '{field_name} field"

    field = model._meta.get_field(field_name)

    assert isinstance(field, expected_type), f"Field is not type {expected_type}"


## Verify nullable or not nullable fields =====================================================
@pytest.mark.parametrize(
    "model, field_name, expected_nullable",
    [
        (CourseCategory, "title", False),
        (CourseCategory, "slug", False),
        (CourseCategory, "is_active", False),
    ],
)
def test_model_structure_nullable_constraints(model, field_name, expected_nullable):
    field = model._meta.get_field(field_name)

    assert (
            field.null is expected_nullable
    ), f"Field '{field_name}' has unexpected nullable constraint"


## Validate the enforcement of unique constraints for columns requiring unique values
@pytest.mark.parametrize(
    "model, field_name, is_unique",
    [
        (CourseCategory, "title", False),
        (CourseCategory, "slug", True),
        (CourseCategory, "is_active", False),
    ],
)
def test_model_structure_unique_fields(model, field_name, is_unique):
    field = model._meta.get_field(field_name)

    assert field.unique == is_unique, f"Field '{field_name}' uniqueness mismatch"


## Ensure that column lengths align with defined requirements.
@pytest.mark.parametrize(
    "model, field_name, expected_length",
    [
        (CourseCategory, "title", 255),
        (CourseCategory, "slug", 255),
    ],
)
def test_model_structure_column_lengths(model, field_name, expected_length):
    field = model._meta.get_field(field_name)

    assert (
            field.max_length == expected_length
    ), f"Field '{field_name}' has unexpected max length"


@pytest.mark.parametrize(
    "model, field_name, expected_default_value",
    [
        (CourseCategory, "is_active", False),
    ],
)
def test_model_structure_default_values(model, field_name, expected_default_value):
    field = model._meta.get_field(field_name)
    default_value = field.default

    assert default_value == expected_default_value

