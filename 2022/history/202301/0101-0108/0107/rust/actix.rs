//
use actix_web::{web, App, HttpServer, Responder};

async fn index() -> impl Responder {
    "Hello world!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            // prefixes all resources and routes attached to it...
            web::scope("/app")
                // ...so this handles requests for `GET /app/index.html`
                .route("/index.html", web::get().to(index)),
        )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

//HttpServerとは、HTTPサーバーを構築するための構造体です。
use actix_web::{get, web, App, HttpServer};

// This struct represents state
struct AppState {
    app_name: String,
}

#[get("/")]
async fn index(data: web::Data<AppState>) -> String {
    let app_name = &data.app_name; // <- get app_name
    format!("Hello {app_name}!") // <- response with app_name
}

//actix_web::mainとは、actix-webのメインループを実行するためのマクロです。
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .app_data(web::Data::new(AppState {
                app_name: String::from("Actix Web"),
            }))
            .service(index)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

//std::sync::Mutexとは、排他制御を行うための構造体です。
use actix_web::{web, App, HttpServer};
use std::sync::Mutex;

struct AppStateWithCounter {
    counter: Mutex<i32>, // <- Mutex is necessary to mutate safely across threads
}

async fn index(data: web::Data<AppStateWithCounter>) -> String {
    let mut counter = data.counter.lock().unwrap(); // <- get counter's MutexGuard
    *counter += 1; // <- access counter inside MutexGuard

    format!("Request number: {counter}") // <- response with count
}

//
use actix_web::{web, App, HttpResponse, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::get().to(HttpResponse::Ok)))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}

//SslAcceptorとは、SSL/TLSの接続を許可するための構造体です。
use actix_web::{get, App, HttpRequest, HttpServer, Responder};
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod};

#[get("/")]
async fn index(_req: HttpRequest) -> impl Responder {
    "Welcome!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // load TLS keys
    // to create a self-signed temporary cert for testing:
    // `openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 -subj '/CN=localhost'`
    let mut builder = SslAcceptor::mozilla_intermediate(SslMethod::tls()).unwrap();
    builder
        .set_private_key_file("key.pem", SslFiletype::PEM)
        .unwrap();
    builder.set_certificate_chain_file("cert.pem").unwrap();

    HttpServer::new(|| App::new().service(index))
        .bind_openssl("127.0.0.1:8080", builder)?
        .run()
        .await
}

//
use actix_web::{http::KeepAlive, HttpServer};
use std::time::Duration;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Set keep-alive to 75 seconds
    let _one = HttpServer::new(app).keep_alive(Duration::from_secs(75));

    // Use OS's keep-alive (usually quite long)
    let _two = HttpServer::new(app).keep_alive(KeepAlive::Os);

    // Disable keep-alive
    let _three = HttpServer::new(app).keep_alive(None);

    Ok(())
}

//
use actix_web::{http, HttpRequest, HttpResponse};

async fn index(req: HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        .connection_type(http::ConnectionType::Close) // <- Close connection
        .force_close() // <- Alternative method
        .finish()
}

//
use actix_web::{get, web, App, HttpServer, Result};

/// extract path info from "/users/{user_id}/{friend}" url
/// {user_id} - deserializes to a u32
/// {friend} - deserializes to a String
#[get("/users/{user_id}/{friend}")] // <- define path parameters
async fn index(path: web::Path<(u32, String)>) -> Result<String> {
    let (user_id, friend) = path.into_inner();
    Ok(format!("Welcome {}, user_id {}!", friend, user_id))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(index))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}

//Deserializeとは、JSONやURLクエリ文字列などのデータを構造体にデシリアライズするためのトレイトです。
use actix_web::{get, web, Result};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    user_id: u32,
    friend: String,
}

/// extract path info using serde
#[get("/users/{user_id}/{friend}")] // <- define path parameters
async fn index(info: web::Path<Info>) -> Result<String> {
    Ok(format!(
        "Welcome {}, user_id {}!",
        info.friend, info.user_id
    ))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| App::new().service(index))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}

//
#[get("/users/{user_id}/{friend}")] // <- define path parameters
async fn index(req: HttpRequest) -> Result<String> {
    let name: String = req.match_info().get("friend").unwrap().parse().unwrap();
    let userid: i32 = req.match_info().query("user_id").parse().unwrap();

    Ok(format!("Welcome {}, user_id {}!", name, userid))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| App::new().service(index))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}

//

use actix_web::{post, web, App, HttpServer, Result};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

/// deserialize `Info` from request's body
#[post("/submit")]
async fn submit(info: web::Json<Info>) -> Result<String> {
    Ok(format!("Welcome {}!", info.username))
}

//
use actix_web::{error, web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

/// deserialize `Info` from request's body, max payload size is 4kb
async fn index(info: web::Json<Info>) -> impl Responder {
    format!("Welcome {}!", info.username)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let json_config = web::JsonConfig::default()
            .limit(4096)
            .error_handler(|err, _req| {
                // create custom error response
                error::InternalError::from_response(err, HttpResponse::Conflict().finish())
                    .into()
            });

        App::new().service(
            web::resource("/")
                // change json extractor configuration
                .app_data(json_config)
                .route(web::post().to(index)),
        )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

//
use actix_web::{web, App, HttpServer, Responder};
use std::cell::Cell;

#[derive(Clone)]
struct AppState {
    count: Cell<usize>,
}

async fn show_count(data: web::Data<AppState>) -> impl Responder {
    format!("count: {}", data.count.get())
}

async fn add_one(data: web::Data<AppState>) -> impl Responder {
    let count = data.count.get();
    data.count.set(count + 1);

    format!("count: {}", data.count.get())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let data = AppState {
        count: Cell::new(0),
    };

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(data.clone()))
            .route("/", web::to(show_count))
            .route("/add", web::to(add_one))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

use actix_web::{get, web, App, HttpServer, Responder};
use std::{
    cell::Cell,
    sync::atomic::{AtomicUsize, Ordering},
    sync::Arc,
};

#[derive(Clone)]
struct AppState {
    local_count: Cell<usize>,
    global_count: Arc<AtomicUsize>,
}

#[get("/")]
async fn show_count(data: web::Data<AppState>) -> impl Responder {
    format!(
        "global_count: {}\nlocal_count: {}",
        data.global_count.load(Ordering::Relaxed),
        data.local_count.get()
    )
}

#[get("/add")]
async fn add_one(data: web::Data<AppState>) -> impl Responder {
    data.global_count.fetch_add(1, Ordering::Relaxed);

    let local_count = data.local_count.get();
    data.local_count.set(local_count + 1);

    format!(
        "global_count: {}\nlocal_count: {}",
        data.global_count.load(Ordering::Relaxed),
        data.local_count.get()
    )
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let data = AppState {
        local_count: Cell::new(0),
        global_count: Arc::new(AtomicUsize::new(0)),
    };

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(data.clone()))
            .service(show_count)
            .service(add_one)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

use actix_web::{
    body::BoxBody, http::header::ContentType, HttpRequest, HttpResponse, Responder,
};

use serde::Serialize;

#[derive(Serialize)]
struct MyObj {
    name: &'static str,
}

// Responder
impl Responder for MyObj {
    type Body = BoxBody;

    fn respond_to(self, _req: &HttpRequest) -> HttpResponse<Self::Body> {
        let body = serde_json::to_string(&self).unwrap();

        // Create response and set content type
        HttpResponse::Ok()
            .content_type(ContentType::json())
            .body(body)
    }
}

async fn index() -> impl Responder {
    MyObj { name: "user" }
}

use actix_web::{Either, Error, HttpResponse};

type RegisterResult = Either<HttpResponse, Result<&'static str, Error>>;

async fn index() -> RegisterResult {
    if is_a_variant() {
        // choose Left variant
        Either::Left(HttpResponse::BadRequest().body("Bad data"))
    } else {
        // choose Right variant
        Either::Right(Ok("Hello!"))
    }
}

//ResponseError とは、エラーをレスポンスに変換するためのトレイトです。このトレイトを実装することで、エラーをレスポンスに変換することができます。
pub trait ResponseError {
    fn error_response(&self) -> Response<Body>;
    fn status_code(&self) -> StatusCode;
}

//