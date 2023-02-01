//CakeFillingとは、CakeとFillingの中間テーブルである。
use super::cake::Entity as Cake;
use super::cake_filling::Entity as CakeFilling;

// Find by primary key
let cheese: Option<cake::Model> = Cake::find_by_id(1).one(db).await?;

// Find by composite primary keys
let vanilla: Option<cake_filling::Model> = CakeFilling::find_by_id((6, 8)).one(db).await?;

//cakeとは、CakeFillingのcake_idをcake_idとして持つCakeの集合である。
let chocolate: Vec<cake::Model> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
    .all(db)
    .await?;

let chocolate: Vec<cake::Model> = Cake::find()
    .filter(cake::Column::Name.contains("chocolate"))
    .order_by_asc(cake::Column::Name)
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

use sea_orm::{entity::*, query::*, tests_cfg::cake_filling};
let rows = cake_filling::Entity::find()
    .cursor_by((cake_filling::Column::CakeId, cake_filling::Column::FillingId))
    .after((0, 1))
    .before((10, 11))
    .first(3)
    .all(&db)
    .await?,

//
let cheese: Option<cake::Model> = Cake::find_by_id(1).one(db).await?;

// Get Model
let model: cake::Model = cheese.unwrap();
assert_eq!(model.name, "Cheese Cake".to_owned());

// Into ActiveModel
let active_model: cake::ActiveModel = model.into();
assert_eq!(active_model.name, ActiveValue::unchanged("Cheese Cake".to_owned()));

//deriveとは、ActiveModelを生成するためのマクロである。
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "fruit")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)] // Skip deserializing
    pub id: i32,
    pub name: String,
    pub cake_id: Option<i32>,
}

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

let res: InsertResult = fruit::Entity::insert(pear).exec(db).await?;
assert_eq!(res.last_insert_id, 28)

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

//
let pear: Option<fruit::Model> = Fruit::find_by_id(28).one(db).await?;

// Into ActiveModel
let mut pear: fruit::ActiveModel = pear.unwrap().into();

// Update name attribute
pear.name = Set("Sweet pear".to_owned());

// Update corresponding row in database using primary key value
let pear: fruit::Model = pear.update(db).await?;

use sea_orm::entity::ModelTrait;

let orange: Option<fruit::Model> = Fruit::find_by_id(30).one(db).await?;
let orange: fruit::Model = orange.unwrap();

let res: DeleteResult = orange.delete(db).await?;
assert_eq!(res.rows_affected, 1);

