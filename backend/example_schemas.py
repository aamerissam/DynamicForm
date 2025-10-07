"""
Example form schemas demonstrating various features.
"""

from datetime import datetime, timedelta
from models import (
    FormSchema, ParamCategory, Param,
    EnumContent, DependentEnumContent, StringContent,
    NumberContent, DateContent, RangeContent, BooleanContent,
    EnumValue, ValidationRule
)


# ============================================================================
# Example 1: E-commerce Product Filter
# ============================================================================

ECOMMERCE_FILTER_SCHEMA = FormSchema(
    paramCategories=[
        ParamCategory(
            name="product_filters",
            description="Filter Products",
            params=[
                Param(
                    name="category",
                    type="list",
                    description="Category",
                    required=True,
                    related=None,
                    content=EnumContent(
                        type="enum",
                        values=[
                            EnumValue(label="Electronics", value="electronics", icon="laptop"),
                            EnumValue(label="Clothing", value="clothing", icon="shirt"),
                            EnumValue(label="Home & Garden", value="home_garden", icon="home"),
                            EnumValue(label="Sports", value="sports", icon="basketball"),
                        ]
                    )
                ),
                Param(
                    name="subcategory",
                    type="sub_list",
                    description="Subcategory",
                    required=False,
                    related="category",
                    content=DependentEnumContent(
                        type="dependent_enum",
                        dependsOn="category",
                        mapping={
                            "electronics": [
                                EnumValue(label="Laptops", value="laptops"),
                                EnumValue(label="Phones", value="phones"),
                                EnumValue(label="Tablets", value="tablets"),
                                EnumValue(label="Accessories", value="accessories"),
                            ],
                            "clothing": [
                                EnumValue(label="Men", value="men"),
                                EnumValue(label="Women", value="women"),
                                EnumValue(label="Children", value="children"),
                            ],
                            "home_garden": [
                                EnumValue(label="Furniture", value="furniture"),
                                EnumValue(label="Décor", value="decor"),
                                EnumValue(label="Garden Tools", value="garden_tools"),
                            ],
                            "sports": [
                                EnumValue(label="Fitness", value="fitness"),
                                EnumValue(label="Outdoor", value="outdoor"),
                                EnumValue(label="Team Sports", value="team_sports"),
                            ],
                        }
                    )
                ),
                Param(
                    name="price_range",
                    type="range",
                    description="Price Range",
                    required=False,
                    related=None,
                    content=RangeContent(
                        type="number_range",
                        min=0,
                        max=5000,
                        step=50,
                        defaultValue=[0, 2500],
                        currency="GBP"
                    )
                ),
                Param(
                    name="in_stock",
                    type="checkbox",
                    description="In Stock Only",
                    required=False,
                    related=None,
                    content=BooleanContent(
                        type="boolean",
                        defaultValue=True
                    )
                ),
                Param(
                    name="brand",
                    type="multi_select",
                    description="Brands",
                    required=False,
                    related=None,
                    content=EnumContent(
                        type="enum",
                        multiple=True,
                        maxSelections=5,
                        searchable=True,
                        values=[
                            EnumValue(label="Apple", value="apple"),
                            EnumValue(label="Samsung", value="samsung"),
                            EnumValue(label="Sony", value="sony"),
                            EnumValue(label="LG", value="lg"),
                            EnumValue(label="Nike", value="nike"),
                            EnumValue(label="Adidas", value="adidas"),
                        ]
                    )
                ),
            ]
        )
    ]
)


# ============================================================================
# Example 2: User Registration Form
# ============================================================================

USER_REGISTRATION_SCHEMA = FormSchema(
    paramCategories=[
        ParamCategory(
            name="basic_info",
            description="Basic Information",
            params=[
                Param(
                    name="email",
                    type="text_field",
                    description="Email Address",
                    required=True,
                    related=None,
                    content=StringContent(
                        type="string",
                        pattern=r"^[^@]+@[^@]+\.[^@]+$",
                        placeholder="you@example.com"
                    ),
                    x_validation=[
                        ValidationRule(
                            rule="unique_email",
                            message="This email is already registered",
                            endpoint="/api/validate/email",
                            async_=True,
                            debounce=500
                        )
                    ]
                ),
                Param(
                    name="password",
                    type="text_field",
                    description="Password",
                    required=True,
                    related=None,
                    content=StringContent(
                        type="string",
                        minLength=8,
                        pattern=r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$",
                        placeholder="Minimum 8 characters"
                    ),
                    x_ui_hints={
                        "inputType": "password",
                        "showStrengthMeter": True
                    }
                ),
                Param(
                    name="full_name",
                    type="text_field",
                    description="Full Name",
                    required=True,
                    related=None,
                    content=StringContent(
                        type="string",
                        minLength=2,
                        maxLength=100,
                        placeholder="John Smith"
                    )
                ),
                Param(
                    name="birth_date",
                    type="date_field",
                    description="Date of Birth",
                    required=True,
                    related=None,
                    content=DateContent(
                        type="date",
                        format="YYYY-MM-DD",
                        min="1900-01-01",  # Reasonable minimum
                        max=(datetime.now() - timedelta(days=13*365)).strftime("%Y-%m-%d")  # Must be 13+ years old
                    )
                ),
            ]
        ),
        ParamCategory(
            name="address",
            description="Address Information",
            params=[
                Param(
                    name="country",
                    type="list",
                    description="Country",
                    required=True,
                    related=None,
                    content=EnumContent(
                        type="enum",
                        values=[
                            EnumValue(label="United Kingdom", value="GB"),
                            EnumValue(label="United States", value="US"),
                            EnumValue(label="Canada", value="CA"),
                            EnumValue(label="Australia", value="AU"),
                            EnumValue(label="Germany", value="DE"),
                            EnumValue(label="France", value="FR"),
                        ]
                    )
                ),
                Param(
                    name="postal_code",
                    type="text_field",
                    description="Postal Code",
                    required=True,
                    related=None,
                    content=StringContent(
                        type="string",
                        placeholder="Enter postal code"
                    )
                ),
                Param(
                    name="address_line1",
                    type="text_field",
                    description="Address Line 1",
                    required=True,
                    related=None,
                    content=StringContent(
                        type="string",
                        maxLength=200,
                        placeholder="Street address"
                    )
                ),
                Param(
                    name="address_line2",
                    type="text_field",
                    description="Address Line 2",
                    required=False,
                    related=None,
                    content=StringContent(
                        type="string",
                        maxLength=200,
                        placeholder="Flat, suite, etc. (optional)"
                    )
                ),
            ]
        ),
        ParamCategory(
            name="preferences",
            description="Preferences",
            params=[
                Param(
                    name="newsletter",
                    type="switch",
                    description="Subscribe to newsletter",
                    required=False,
                    related=None,
                    content=BooleanContent(
                        type="boolean",
                        defaultValue=False
                    )
                ),
                Param(
                    name="communication_method",
                    type="radio",
                    description="Preferred Communication Method",
                    required=True,
                    related=None,
                    content=EnumContent(
                        type="enum",
                        layout="vertical",
                        values=[
                            EnumValue(label="Email", value="email"),
                            EnumValue(label="SMS", value="sms"),
                            EnumValue(label="Phone", value="phone"),
                        ]
                    )
                ),
            ]
        )
    ]
)


# ============================================================================
# Example 3: Multi-Level Location Selector
# ============================================================================

LOCATION_SELECTOR_SCHEMA = FormSchema(
    paramCategories=[
        ParamCategory(
            name="location",
            description="Select Your Location",
            params=[
                Param(
                    name="country",
                    type="list",
                    description="Country",
                    required=True,
                    related=None,
                    content=EnumContent(
                        type="enum",
                        values=[
                            EnumValue(label="United Kingdom", value="GB"),
                            EnumValue(label="United States", value="US"),
                        ]
                    )
                ),
                Param(
                    name="region",
                    type="sub_list",
                    description="Region/State",
                    required=True,
                    related="country",
                    content=DependentEnumContent(
                        type="dependent_enum",
                        dependsOn="country",
                        mapping={
                            "GB": [
                                EnumValue(label="England", value="england"),
                                EnumValue(label="Scotland", value="scotland"),
                                EnumValue(label="Wales", value="wales"),
                                EnumValue(label="Northern Ireland", value="northern_ireland"),
                            ],
                            "US": [
                                EnumValue(label="California", value="CA"),
                                EnumValue(label="New York", value="NY"),
                                EnumValue(label="Texas", value="TX"),
                                EnumValue(label="Florida", value="FL"),
                            ],
                        }
                    )
                ),
                Param(
                    name="city",
                    type="sub_list",
                    description="City",
                    required=True,
                    related="region",
                    content=DependentEnumContent(
                        type="dependent_enum",
                        dependsOn="region",
                        searchable=True,
                        mapping={
                            "england": [
                                EnumValue(label="London", value="london"),
                                EnumValue(label="Manchester", value="manchester"),
                                EnumValue(label="Birmingham", value="birmingham"),
                            ],
                            "scotland": [
                                EnumValue(label="Edinburgh", value="edinburgh"),
                                EnumValue(label="Glasgow", value="glasgow"),
                            ],
                            "CA": [
                                EnumValue(label="Los Angeles", value="los_angeles"),
                                EnumValue(label="San Francisco", value="san_francisco"),
                                EnumValue(label="San Diego", value="san_diego"),
                            ],
                            "NY": [
                                EnumValue(label="New York City", value="nyc"),
                                EnumValue(label="Buffalo", value="buffalo"),
                            ],
                        }
                    )
                ),
            ]
        )
    ]
)


# Schema registry
SCHEMA_REGISTRY = {
    "ecommerce_filter": ECOMMERCE_FILTER_SCHEMA,
    "user_registration": USER_REGISTRATION_SCHEMA,
    "location_selector": LOCATION_SELECTOR_SCHEMA,
}

