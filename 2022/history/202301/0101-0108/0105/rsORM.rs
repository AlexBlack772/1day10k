//
#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "json_struct")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    // JSON column defined in `serde_json::Value`
    pub json: Json,
    // JSON column defined in custom struct
    pub json_value: KeyValue,
    pub json_value_opt: Option<KeyValue>,
}

// The custom struct must derive `FromJsonQueryResult`, `Serialize` and `Deserialize`
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
pub struct KeyValue {
    pub id: i32,
    pub name: String,
    pub price: f32,
    pub notes: Option<String>,
}


use super::cake::Entity as Cake;
use super::cake_filling::Entity as CakeFilling;

// Find by primary key
let cheese: Option<cake::Model> = Cake::find_by_id(1).one(db).await?;

// Find by composite primary keys
let vanilla: Option<cake_filling::Model> = CakeFilling::find_by_id((6, 8)).one(db).await?;

let chocolate: Vec<cake::Model> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .all(db)
    .await?;

// Find a cake model first
let cheese: Option<cake::Model> = Cake::find_by_id(1).one(db).await?;
let cheese: cake::Model = cheese.unwrap();

// Then, find all related fruits of this cake
let fruits: Vec<fruit::Model> = cheese.find_related(Fruit).all(db).await?;

let cake_with_fruits: Vec<(cake::Model, Vec<fruit::Model>)> = Cake::find()
    .find_with_related(Fruit)
    .all(db)
    .await?;

use sea_orm::{entity::*, query::*, tests_cfg::cake};
let mut cake_pages = cake::Entity::find()
    .order_by_asc(cake::Column::Id)
    .paginate(db, 50);
 
while let Some(cakes) = cake_pages.fetch_and_next().await? {
    // Do something on cakes: Vec<cake::Model>
}

use sea_orm::{entity::*, query::*, tests_cfg::cake};
// Create a cursor that order by `cake`.`id`
let mut cursor = cake::Entity::find().cursor_by(cake::Column::Id);

// Filter paginated result by `cake`.`id` > 1 AND `cake`.`id` < 100
cursor.after(1).before(100);

// Get first 10 rows (order by `cake`.`id` ASC)
for cake in cursor.first(10).all(db).await? {
    // Do something on cake: cake::Model
}

// Get last 10 rows (order by `cake`.`id` DESC but rows are returned in ascending order)
for cake in cursor.last(10).all(db).await? {
    // Do something on cake: cake::Model
}

let cheese: Option<cake::Model> = Cake::find_by_id(1).one(db).await?;

// Get Model
let model: cake::Model = cheese.unwrap();
assert_eq!(model.name, "Cheese Cake".to_owned());

// Into ActiveModel
let active_model: cake::ActiveModel = model.into();
assert_eq!(active_model.name, ActiveValue::unchanged("Cheese Cake".to_owned()));

//
let cheese: Option<cake::Model> = Cake::find_by_id(1).one(db).await?;

// Get Model
let model: cake::Model = cheese.unwrap();
assert_eq!(model.name, "Cheese Cake".to_owned());

// Into ActiveModel
let active_model: cake::ActiveModel = model.into();
assert_eq!(active_model.name, ActiveValue::unchanged("Cheese Cake".to_owned()));


//
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "fruit")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)] // Skip deserializing
    pub id: i32,
    pub name: String,
    pub cake_id: Option<i32>,
}

//
// A ActiveModel with primary key set
let mut fruit = fruit::ActiveModel {
    id: ActiveValue::Set(1),
    name: ActiveValue::NotSet,
    cake_id: ActiveValue::NotSet,
};

// Note that this method will not alter the primary key values in ActiveModel
fruit.set_from_json(json!({
    "id": 8,
    "name": "Apple",
    "cake_id": 1,
}))?;

assert_eq!(
    fruit,
    fruit::ActiveModel {
        id: ActiveValue::Set(1),
        name: ActiveValue::Set("Apple".to_owned()),
        cake_id: ActiveValue::Set(Some(1)),
    }
);

//
let fruit = fruit::ActiveModel::from_json(json!({
    "name": "Apple",
}))?;

assert_eq!(
    fruit,
    fruit::ActiveModel {
        id: ActiveValue::NotSet,
        name: ActiveValue::Set("Apple".to_owned()),
        cake_id: ActiveValue::NotSet,
    }
);

//
assert_eq!(
    ActiveModel {
        id: Set(2),
        name: Set("Apple".to_owned()),
        cake_id: Set(Some(1)),
    }
    .try_into_model()
    .unwrap(),
    Model {
        id: 2,
        name: "Apple".to_owned(),
        cake_id: Some(1),
    }
);

assert_eq!(
    ActiveModel {
        id: Set(1),
        name: NotSet,
        cake_id: Set(None),
    }
    .try_into_model(),
    Err(DbErr::AttrNotSet(String::from("name")))
);

//
let pear = fruit::ActiveModel {
    name: Set("Pear".to_owned()),
    ..Default::default() // all other attributes are `NotSet`
};

let pear: fruit::Model = pear.insert(db).await?;

//
let pear = fruit::ActiveModel {
    name: Set("Pear".to_owned()),
    ..Default::default() // all other attributes are `NotSet`
};

let res: InsertResult = fruit::Entity::insert(pear).exec(db).await?;
assert_eq!(res.last_insert_id, 28)

//
let apple = fruit::ActiveModel {
    name: Set("Apple".to_owned()),
    ..Default::default()
};

let orange = fruit::ActiveModel {
    name: Set("Orange".to_owned()),
    ..Default::default()
};

let res: InsertResult = Fruit::insert_many(vec![apple, orange]).exec(db).await?;
assert_eq!(res.last_insert_id, 30)

//
let orange = cake::ActiveModel {
    id: ActiveValue::set(2),
    name: ActiveValue::set("Orange".to_owned()),
};

assert_eq!(
    cake::Entity::insert(orange.clone())
        .on_conflict(
            // on conflict do nothing
            sea_query::OnConflict::column(cake::Column::Name)
                .do_nothing()
                .to_owned()
        )
        .build(DbBackend::Postgres)
        .to_string(),
    r#"INSERT INTO "cake" ("id", "name") VALUES (2, 'Orange') ON CONFLICT ("name") DO NOTHING"#,
);

assert_eq!(
    cake::Entity::insert(orange)
        .on_conflict(
            // on conflict do update
            sea_query::OnConflict::column(cake::Column::Name)
                .update_column(cake::Column::Name)
                .to_owned()
        )
        .build(DbBackend::Postgres)
        .to_string(),
    r#"INSERT INTO "cake" ("id", "name") VALUES (2, 'Orange') ON CONFLICT ("name") DO UPDATE SET "name" = "excluded"."name""#,
);

// Bulk set attributes using ActiveModel
let update_result: UpdateResult = Fruit::update_many()
    .set(pear)
    .filter(fruit::Column::Id.eq(1))
    .exec(db)
    .await?;

// UPDATE `fruit` SET `cake_id` = 1 WHERE `fruit`.`name` LIKE '%Apple%'
Fruit::update_many()
    .col_expr(fruit::Column::CakeId, Expr::value(1))
    .filter(fruit::Column::Name.contains("Apple"))
    .exec(db)
    .await?;

//
use sea_orm::ActiveValue::NotSet;

let banana = fruit::ActiveModel {
    id: NotSet, // primary key is NotSet
    name: Set("Banana".to_owned()),
    ..Default::default() // all other attributes are `NotSet`
};

// Insert, because primary key `id` is `NotSet`
let banana: fruit::ActiveModel = banana.save(db).await?;

banana.name = Set("Banana Mongo".to_owned());

// Update, because primary key `id` is `Unchanged`
let banana: fruit::ActiveModel = banana.save(db).await?;

//
use sea_orm::entity::ModelTrait;

let orange: Option<fruit::Model> = Fruit::find_by_id(30).one(db).await?;
let orange: fruit::Model = orange.unwrap();

let res: DeleteResult = orange.delete(db).await?;
assert_eq!(res.rows_affected, 1);

//
// DELETE FROM `fruit` WHERE `fruit`.`name` LIKE '%Orange%'
let res: DeleteResult = fruit::Entity::delete_many()
    .filter(fruit::Column::Name.contains("Orange"))
    .exec(db)
    .await?;

assert_eq!(res.rows_affected, 2);

//
// Find by id
let cake: Option<serde_json::Value> = Cake::find_by_id(1)
    .into_json()
    .one(db)
    .await?;

assert_eq!(
    cake,
    Some(serde_json::json!({
        "id": 1,
        "name": "Cheese Cake"
    }))
);

// Find with filter
let cakes: Vec<serde_json::Value> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .into_json()
    .all(db)
    .await?;

assert_eq!(
    cakes,
    vec![
        serde_json::json!({
            "id": 2,
            "name": "Chocolate Forest"
        }),
        serde_json::json!({
            "id": 8,
            "name": "Chocolate Cupcake"
        }),
    ]
);

// Paginate json result
let cake_pages: Paginator<_> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .into_json()
    .paginate(db, 50);

while let Some(cakes) = cake_pages.fetch_and_next().await? {
    // Do something on cakes: Vec<serde_json::Value>
}

//
// Find by id
let cake: Option<serde_json::Value> = Cake::find_by_id(1)
    .into_json()
    .one(db)
    .await?;

assert_eq!(
    cake,
    Some(serde_json::json!({
        "id": 1,
        "name": "Cheese Cake"
    }))
);

// Find with filter
let cakes: Vec<serde_json::Value> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .into_json()
    .all(db)
    .await?;

assert_eq!(
    cakes,
    vec![
        serde_json::json!({
            "id": 2,
            "name": "Chocolate Forest"
        }),
        serde_json::json!({
            "id": 8,
            "name": "Chocolate Cupcake"
        }),
    ]
);

// Paginate json result
let cake_pages: Paginator<_> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .into_json()
    .paginate(db, 50);

while let Some(cakes) = cake_pages.fetch_and_next().await? {
    // Do something on cakes: Vec<serde_json::Value>
}

// Find by id
let cake: Option<serde_json::Value> = Cake::find_by_id(1)
    .into_json()
    .one(db)
    .await?;

assert_eq!(
    cake,
    Some(serde_json::json!({
        "id": 1,
        "name": "Cheese Cake"
    }))
);

// Find with filter
let cakes: Vec<serde_json::Value> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .into_json()
    .all(db)
    .await?;

assert_eq!(
    cakes,
    vec![
        serde_json::json!({
            "id": 2,
            "name": "Chocolate Forest"
        }),
        serde_json::json!({
            "id": 8,
            "name": "Chocolate Cupcake"
        }),
    ]
);

// Paginate json result
let cake_pages: Paginator<_> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .into_json()
    .paginate(db, 50);

while let Some(cakes) = cake_pages.fetch_and_next().await? {
    // Do something on cakes: Vec<serde_json::Value>
}

//
let cheese: Option<cake::Model> = cake::Entity::find()
    .from_raw_sql(Statement::from_sql_and_values(
        DbBackend::Postgres,
        r#"SELECT "cake"."id", "cake"."name" FROM "cake" WHERE "id" = $1"#,
        vec![1.into()],
    ))
    .one(&db)
    .await?;

//
#[derive(Debug, FromQueryResult)]
pub struct UniqueCake {
    name: String,
}

let unique: Vec<UniqueCake> = UniqueCake::find_by_statement(Statement::from_sql_and_values(
        DbBackend::Postgres,
        r#"SELECT "cake"."name" FROM "cake" GROUP BY "cake"."name"#,
        vec![],
    ))
    .all(&db)
    .await?;

let unique: Vec<JsonValue> = JsonValue::find_by_statement(Statement::from_sql_and_values(
        DbBackend::Postgres,
        r#"SELECT "cake"."name" FROM "cake" GROUP BY "cake"."name"#,
        vec![],
    ))
    .all(&db)
    .await?;

//
let mut cake_pages = cake::Entity::find()
    .from_raw_sql(Statement::from_sql_and_values(
        DbBackend::Postgres,
        r#"SELECT "cake"."id", "cake"."name" FROM "cake" WHERE "id" = $1"#,
        vec![1.into()],
    ))
    .paginate(db, 50);
 
while let Some(cakes) = cake_pages.fetch_and_next().await? {
    // Do something on cakes: Vec<cake::Model>
}

//
use sea_orm::DatabaseBackend;

assert_eq!(
    cake_filling::Entity::find_by_id((6, 8))
        .build(DatabaseBackend::MySql)
        .to_string(),
    vec![
        "SELECT `cake_filling`.`cake_id`, `cake_filling`.`filling_id` FROM `cake_filling`",
        "WHERE `cake_filling`.`cake_id` = 6 AND `cake_filling`.`filling_id` = 8",
    ].join(" ")
);

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_one = "super::fruit::Entity")]
    Fruit,
}

// `Related` trait has to be implemented by hand
impl Related<super::fruit::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Fruit.def()
    }
}