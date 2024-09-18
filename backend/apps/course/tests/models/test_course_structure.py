import pytest
from django.contrib.auth import get_user_model
from django.db import models
from ...models import Course, CourseCategory

User = get_user_model()


## Validate the existence of expected columns in each table, ensuring correct data types.

@pytest.mark.parametrize(
    "model, field_name, expected_type",
    [
        (Course, "name", models.CharField),
        (Course, "description", models.TextField),
        (Course, "cover", models.ImageField),
        (Course, "price", models.IntegerField),
        (Course, "slug", models.SlugField),
        (Course, "creator", models.ForeignKey),
        (Course, "category", models.ForeignKey),
        (Course, "is_complete", models.BooleanField),
        (Course, "support", models.CharField),
        (Course, "is_active", models.BooleanField),
    ],
)
def test_model_structure_column_data_types(model, field_name, expected_type):
    assert hasattr(
        model, field_name
    ), f"{model.__name__} model does not have '{field_name} field"

    field = model._meta.get_field(field_name)

    assert isinstance(field, expected_type), f"Field is not type {expected_type}"


## Ensure that column relationships are correctly defined. ============================================
@pytest.mark.parametrize(
    "model, field_name, expected_type, related_model, on_delete_behavior, allow_null, allow_blank",
    [
        (Course, "category", models.ForeignKey, CourseCategory, models.CASCADE, False, False),
        (Course, "creator", models.ForeignKey, User, models.CASCADE, False, False),
    ],
)
def test_model_structure_relationship(
    model,
    field_name,
    expected_type,
    related_model,
    on_delete_behavior,
    allow_null,
    allow_blank,
):
    # Check if the field exists in the model
    assert hasattr(
        model, field_name
    ), f"{model.__name__} model does not have '{field_name} field"

    # Get the field from the model
    field = model._meta.get_field(field_name)

    # Check if it's a ForeignKey
    assert isinstance(field, expected_type), f"Field is not type {expected_type}"

    # Check the related model
    assert (
        field.related_model == related_model
    ), f"'{field_name}' field does not relate to {related_model.__name__} model"

    # Check the on_delete behavior
    assert (
        field.remote_field.on_delete == on_delete_behavior
    ), f"'{field_name}' field does not have on_delete={on_delete_behavior}"

    # Check if the field allows null values
    assert (
        field.null == allow_null
    ), f"'{field_name}' field does not allow null values as expected"

    # Check if the field allows blank values
    assert (
        field.blank == allow_blank
    ), f"'{field_name}' field does not allow blank values as expected"


## Verify nullable or not nullable fields =====================================================
@pytest.mark.parametrize(
    "model, field_name, expected_nullable",
    [
        (Course, "support", True),
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
        (Course, "name", False),
        (Course, "description", False),
        (Course, "cover", False),
        (Course, "price", False),
        (Course, "slug", True),
        (Course, "creator", False),
        (Course, "category", False),
        (Course, "is_complete", False),
        (Course, "support", False),
        (Course, "is_active", False),
    ],
)
def test_model_structure_unique_fields(model, field_name, is_unique):
    field = model._meta.get_field(field_name)

    assert field.unique == is_unique, f"Field '{field_name}' uniqueness mismatch"


## Verify the correctness of default values for relevant columns.
@pytest.mark.parametrize(
    "model, field_name, expected_default_value",
    [
        (Course, "is_active", False),
    ],
)
def test_model_structure_default_values(model, field_name, expected_default_value):
    field = model._meta.get_field(field_name)
    default_value = field.default

    assert default_value == expected_default_value


## Ensure that column lengths align with defined requirements.
@pytest.mark.parametrize(
    "model, field_name, expected_length",
    [
        (Course, "name", 255),
        (Course, "cover", 255),
        (Course, "slug", 255),
        (Course, "support", 255),
    ],
)
def test_model_structure_column_lengths(model, field_name, expected_length):
    field = model._meta.get_field(field_name)

    assert (
        field.max_length == expected_length
    ), f"Field '{field_name}' has unexpected max length"












