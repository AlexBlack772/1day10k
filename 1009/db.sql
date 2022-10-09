SELECT *
FROM fruits
WHERE id > 2;

-- Language: sql
-- Path: 1009/db.sql
SELECT *
FROM fruits
WHERE id > 2
ORDER BY id DESC;

-- select fromを使う
-- Language: sql
-- Path: 1009/db.sql
SELECT * 
FROM fruits 
WHERE name 
LIKE 'ba%';
-- Language: sql
-- Path: 1009/db.sql
SELECT *
FROM fruits
WHERE name LIKE 'ba%';
SELECT * 
FROM fruits 
LIMIT 1,2;
-- Language: sql
-- Path: 1009/db.sql
SELECT *
FROM fruits
LIMIT 1,2;
-- Limitを使う
-- limitとは、取得するレコードの数を指定する
-- 例えば、limit 1,2とすると、1番目のレコードから2つのレコードを取得する
-- whereとは、条件を指定する
-- 例えば、where name like 'ba%'とすると、nameの値がbaから始まるレコードを取得する
-- order byを使う
-- order byとは、並び替えをする
-- 例えば、order by id descとすると、idの値が大きい順に並び替える
-- descとは、降順を意味する
-- ascとは、昇順を意味する
-- group byを使う
-- group byとは、集計をする
-- 例えば、group by nameとすると、nameの値が同じレコードをまとめる
-- countを使う
-- countとは、レコードの数を数える
-- 例えば、count(*)とすると、レコードの数を数える
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch;
-- Language: sql
-- Path: 1009/db.sql
DROP TABLE IF EXISTS fruits;
CREATE TABLE fruits(id int auto_increment primary key, name text, fee int, bunch boolean);
INSERT INTO fruits (name, fee, bunch) VALUES 
('apple', 100, false),
('banana', 200, true),
('blueberry', 400, true),
('aloe', 400, false);
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch;
-- Language: sql
-- Path: 1009/db.sql
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch;
-- avgを使う
-- avgとは、平均を求める
-- 例えば、avg(fee)とすると、feeの平均を求める
SELECT bunch, AVG(fee) FROM fruits GROUP BY bunch;
-- maxを使う
-- maxとは、最大値を求める
-- 例えば、max(fee)とすると、feeの最大値を求める
SELECT bunch, MAX(fee) FROM fruits GROUP BY bunch;
-- minを使う
-- minとは、最小値を求める
-- 例えば、min(fee)とすると、feeの最小値を求める
SELECT bunch, MIN(fee) FROM fruits GROUP BY bunch;
-- havingを使う
-- havingとは、集計した結果に対して条件を指定する
-- 例えば、having SUM(fee) > 500とすると、feeの合計が500より大きいレコードを取得する   
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch HAVING SUM(fee) > 500;
-- existsを使う
-- existsとは、条件を満たすレコードが存在するかを調べる
-- 例えば、exists (select * from fruits where fee > 300)とすると、feeの値が300より大きいレコードが存在するかを調べる
SELECT * FROM fruits WHERE EXISTS (SELECT * FROM fruits WHERE fee > 300);
-- joinを使う
-- joinとは、複数のテーブルを結合する
-- 例えば、join fruits on fruits.id = fruits.idとすると、fruitsテーブルとfruitsテーブルを結合する
-- inner joinを使う
-- inner joinとは、結合するテーブルの条件を指定する
-- 例えば、inner join fruits on fruits.id = fruits.idとすると、fruitsテーブルとfruitsテーブルを結合する
select * from fruits inner join fruits on fruits.id = fruits.id;
-- left joinを使う
-- left joinとは、左側のテーブルを基準に結合する
-- 例えば、left join fruits on fruits.id = fruits.idとすると、fruitsテーブルとfruitsテーブルを結合する
select * from fruits left join fruits on fruits.id = fruits.id;
-- right joinを使う
-- right joinとは、右側のテーブルを基準に結合する
-- 例えば、right join fruits on fruits.id = fruits.idとすると、fruitsテーブルとfruitsテーブルを結合する
select * from fruits right join fruits on fruits.id = fruits.id;
-- full joinを使う
-- full joinとは、左側と右側のテーブルを結合する
-- 例えば、full join fruits on fruits.id = fruits.idとすると、fruitsテーブルとfruitsテーブルを結合する

select * from fruits full join fruits on fruits.id = fruits.id;
-- unionを使う
-- unionとは、複数のクエリの結果を結合する
-- 例えば、select * from fruits union select * from fruitsとすると、fruitsテーブルとfruitsテーブルの結果を結合する
select * from fruits union select * from fruits;
-- existsを使う
-- existsとは、条件を満たすレコードが存在するかを調べる
-- 例えば、exists (select * from fruits where fee > 300)とすると、feeの値が300より大きいレコードが存在するかを調べる
SELECT * FROM fruits WHERE EXISTS (SELECT * FROM fruits WHERE fee > 300);
--findUnique
--findUniqueとは、条件を満たすレコードを1件取得する
-- 例えば、findUnique (select * from fruits where fee > 300)とすると、feeの値が300より大きいレコードを1件取得する
SELECT * FROM fruits WHERE EXISTS (SELECT * FROM fruits WHERE fee > 300);
--likeを使う
--likeとは、部分一致を調べる
-- 例えば、like '%a%'とすると、aが含まれるレコードを取得する
SELECT * FROM fruits WHERE name like '%a%';
--asを使う
--asとは、別名を指定する
-- 例えば、name as fruit_nameとすると、nameをfruit_nameという別名で指定する
SELECT name as fruit_name, fee FROM fruits;
--distinctを使う
--distinctとは、重複を除く
-- 例えば、distinct nameとすると、nameの重複を除く
SELECT distinct name FROM fruits;
--order byを使う
--order byとは、並び替えをする
-- 例えば、order by fee descとすると、feeの値を降順に並び替える
SELECT * FROM fruits order by fee desc;
--group byを使う
--group byとは、集計をする
-- 例えば、group by bunchとすると、bunchの値で集計する
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch;
--cross joinを使う
--cross joinとは、直積を求める
-- 例えば、cross join fruitsとすると、fruitsテーブルとfruitsテーブルの直積を求める
select * from fruits cross join fruits;
--inを使う
--inとは、条件を満たすレコードを取得する
-- 例えば、in (1, 2, 3)とすると、idが1, 2, 3のレコードを取得する
SELECT * FROM fruits WHERE id in (1, 2, 3);
--not inを使う
--not inとは、条件を満たさないレコードを取得する
-- 例えば、not in (1, 2, 3)とすると、idが1, 2, 3でないレコードを取得する
SELECT * FROM fruits WHERE id not in (1, 2, 3);
--betweenを使う
--betweenとは、範囲を指定してレコードを取得する
-- 例えば、between 1 and 3とすると、idが1から3のレコードを取得する
SELECT * FROM fruits WHERE id between 1 and 3;
--not betweenを使う
--not betweenとは、範囲を指定してレコードを取得する
-- 例えば、not between 1 and 3とすると、idが1から3でないレコードを取得する
SELECT * FROM fruits WHERE id not between 1 and 3;
--caseを使う
--caseとは、条件によって値を変える
-- 例えば、case when fee > 300 then '高い' else '安い' end as priceとすると、feeの値が300より大きい場合は高い、そうでない場合は安いという値をpriceという別名で指定する
SELECT name, fee, case when fee > 300 then '高い' else '安い' end as price FROM fruits;
--countを使う
--countとは、レコード数を数える
-- 例えば、count(*)とすると、レコード数を数える
SELECT count(*) FROM fruits;
--sumを使う
--sumとは、合計を求める
-- 例えば、sum(fee)とすると、feeの合計を求める
SELECT sum(fee) FROM fruits;
--maxを使う
--maxとは、最大値を求める
-- 例えば、max(fee)とすると、feeの最大値を求める
SELECT max(fee) FROM fruits;
--minを使う
--minとは、最小値を求める
-- 例えば、min(fee)とすると、feeの最小値を求める
SELECT min(fee) FROM fruits;
--avgを使う
--avgとは、平均を求める
-- 例えば、avg(fee)とすると、feeの平均を求める
SELECT avg(fee) FROM fruits;
--havingを使う
--havingとは、集計した結果を条件で絞り込む
-- 例えば、having sum(fee) > 300とすると、feeの合計が300より大きいレコードを取得する
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch having sum(fee) > 300;
--unionを使う
--unionとは、2つの結果を結合する
-- 例えば、union allを使うと、2つの結果を結合する
SELECT * FROM fruits union all SELECT * FROM fruits;
--full joinを使う
--full joinとは、外部結合をする
-- 例えば、full join fruits as f on f.id = fruits.idとすると、fruitsテーブルとfruitsテーブルの外部結合をする
SELECT * FROM fruits full join fruits as f on f.id = fruits.id;
--left joinを使う
--left joinとは、左外部結合をする
-- 例えば、left join fruits as f on f.id = fruits.idとすると、fruitsテーブルとfruitsテーブルの左外部結合をする
SELECT * FROM fruits left join fruits as f on f.id = fruits.id;
--right joinを使う
--right joinとは、右外部結合をする
-- 例えば、right join fruits as f on f.id = fruits.idとすると、fruitsテーブルとfruitsテーブルの右外部結合をする
SELECT * FROM fruits right join fruits as f on f.id = fruits.id;
--inner joinを使う
--inner joinとは、内部結合をする
-- 例えば、inner join fruits as f on f.id = fruits.idとすると、fruitsテーブルとfruitsテーブルの内部結合をする
SELECT * FROM fruits inner join fruits as f on f.id = fruits.id;
--existsを使う
--existsとは、条件を満たすレコードが存在するかを確認する
-- 例えば、exists (select * from fruits where id = 1)とすると、idが1のレコードが存在するかを確認する
SELECT * FROM fruits WHERE exists (select * from fruits where id = 1);
--not existsを使う
--not existsとは、条件を満たすレコードが存在しないかを確認する
-- 例えば、not exists (select * from fruits where id = 1)とすると、idが1のレコードが存在しないかを確認する
SELECT * FROM fruits WHERE not exists (select * from fruits where id = 1);
--group byを使う
--group byとは、集計する
-- 例えば、group by bunchとすると、bunchごとに集計する
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch;
--order byを使う
--order byとは、並び替える
-- 例えば、order by fee descとすると、feeの値を降順に並び替える
SELECT * FROM fruits order by fee desc;
--limitを使う
--limitとは、取得するレコード数を制限する
-- 例えば、limit 2とすると、2件のレコードを取得する
SELECT * FROM fruits limit 2;
--offsetを使う
--offsetとは、取得するレコードの開始位置を指定する
-- 例えば、offset 2とすると、2件目からレコードを取得する
SELECT * FROM fruits offset 2;
--betweenを使う
--betweenとは、範囲を指定する
-- 例えば、between 1 and 3とすると、1から3の範囲を指定する
SELECT * FROM fruits where id between 1 and 3;
--inを使う
--inとは、複数の値を指定する
-- 例えば、in (1, 2, 3)とすると、1, 2, 3の値を指定する
SELECT * FROM fruits where id in (1, 2, 3);
--likeを使う
--likeとは、部分一致を指定する
-- 例えば、like '%り%'とすると、りが含まれる値を指定する
SELECT * FROM fruits where name like '%り%';
--not likeを使う
--not likeとは、部分一致しない値を指定する
-- 例えば、not like '%り%'とすると、りが含まれない値を指定する
SELECT * FROM fruits where name not like '%り%';
--is nullを使う
--is nullとは、nullの値を指定する
-- 例えば、is nullとすると、nullの値を指定する
SELECT * FROM fruits where name is null;
--is not nullを使う
--is not nullとは、nullでない値を指定する
-- 例えば、is not nullとすると、nullでない値を指定する
SELECT * FROM fruits where name is not null;
--distinctを使う
--distinctとは、重複を除く
-- 例えば、distinct bunchとすると、bunchの重複を除く
SELECT distinct bunch FROM fruits;
--countを使う
--countとは、レコード数を取得する
-- 例えば、count(*)とすると、レコード数を取得する
SELECT count(*) FROM fruits;
--sumを使う
--sumとは、合計を取得する
-- 例えば、sum(fee)とすると、feeの合計を取得する
SELECT sum(fee) FROM fruits;
--group byを使う
--group byとは、集計する
-- 例えば、group by bunchとすると、bunchごとに集計する
SELECT bunch, SUM(fee) FROM fruits GROUP BY bunch;
--create tableを使う
--create tableとは、テーブルを作成する
-- 例えば、create table fruits (id int, name varchar(255))とすると、fruitsテーブルを作成する
create table fruits (id int, name varchar(255));
--alter tableを使う
--alter tableとは、テーブルを変更する
-- 例えば、alter table fruits add column fee intとすると、fruitsテーブルにfeeカラムを追加する
alter table fruits add column fee int;
--drop tableを使う
--drop tableとは、テーブルを削除する
-- 例えば、drop table fruitsとすると、fruitsテーブルを削除する
drop table fruits;
--insert intoを使う
--insert intoとは、レコードを追加する
-- 例えば、insert into fruits (id, name) values (1, 'りんご')とすると、idが1、nameがりんごのレコードを追加する
insert into fruits (id, name) values (1, 'りんご');
--updateを使う
--updateとは、レコードを更新する
-- 例えば、update fruits set name = 'みかん' where id = 1とすると、idが1のレコードのnameをみかんに更新する
update fruits set name = 'みかん' where id = 1;
--delete fromを使う
--delete fromとは、レコードを削除する
-- 例えば、delete from fruits where id = 1とすると、idが1のレコードを削除する
delete from fruits where id = 1;
--truncate tableを使う
--truncate tableとは、テーブルのレコードを削除する
-- 例えば、truncate table fruitsとすると、fruitsテーブルのレコードを削除する
truncate table fruits;
--create indexを使う
--create indexとは、インデックスを作成する
-- 例えば、create index fruits_name_index on fruits (name)とすると、fruitsテーブルのnameカラムにインデックスを作成する
create index fruits_name_index on fruits (name);
--drop indexを使う
--drop indexとは、インデックスを削除する
-- 例えば、drop index fruits_name_index on fruitsとすると、fruitsテーブルのnameカラムのインデックスを削除する
drop index fruits_name_index on fruits;
--create databaseを使う
--create databaseとは、データベースを作成する
-- 例えば、create database fruitsとすると、fruitsデータベースを作成する
create database fruits;
--drop databaseを使う
--drop databaseとは、データベースを削除する
-- 例えば、drop database fruitsとすると、fruitsデータベースを削除する
drop database fruits;
--useを使う
--useとは、データベースを指定する
-- 例えば、use fruitsとすると、fruitsデータベースを指定する
use fruits;
--show databasesを使う
--show databasesとは、データベース一覧を取得する
-- 例えば、show databasesとすると、データベース一覧を取得する
show databases;
--show tablesを使う
--show tablesとは、テーブル一覧を取得する
-- 例えば、show tablesとすると、テーブル一覧を取得する
show tables;
--show columnsを使う
--show columnsとは、カラム一覧を取得する
-- 例えば、show columns from fruitsとすると、fruitsテーブルのカラム一覧を取得する
show columns from fruits;
--defaultを使う
--defaultとは、デフォルト値を指定する
-- 例えば、default 0とすると、0をデフォルト値として指定する
create table fruits (id int, name varchar(255), fee int default 0);
--primary keyを使う
--primary keyとは、主キーを指定する
-- 例えば、primary key (id)とすると、idを主キーとして指定する
create table fruits (id int primary key, name varchar(255), fee int default 0);
--not nullを使う
--not nullとは、nullを許可しない
-- 例えば、not nullとすると、nullを許可しない
create table fruits (id int primary key, name varchar(255) not null, fee int default 0);
--uniqueを使う
--uniqueとは、ユニークを指定する
-- 例えば、unique (name)とすると、nameをユニークとして指定する
create table fruits (id int primary key, name varchar(255) not null unique, fee int default 0);
--foreign keyを使う
--foreign keyとは、外部キーを指定する
-- 例えば、foreign key (id) references fruits(id)とすると、idを外部キーとして指定する
create table fruits (id int primary key, name varchar(255) not null unique, fee int default 0);
create table fruits2 (id int primary key, name varchar(255) not null unique, fee int default 0, foreign key (id) references fruits(id));
--auto_incrementを使う
--auto_incrementとは、自動採番を指定する
-- 例えば、auto_incrementとすると、自動採番を指定する
create table fruits (id int primary key auto_increment, name varchar(255) not null unique, fee int default 0);
--commentを使う
--commentとは、コメントを指定する
-- 例えば、comment 'フルーツ'とすると、フルーツというコメントを指定する
create table fruits (id int primary key auto_increment, name varchar(255) not null unique, fee int default 0 comment 'フルーツ');
--alter tableを使う
--alter tableとは、テーブルを変更する
-- 例えば、alter table fruits add column price int default 0とすると、fruitsテーブルにpriceカラムを追加する
alter table fruits add column price int default 0;
--auto_incrementを使う
--auto_incrementとは、自動採番を指定する
-- 例えば、auto_incrementとすると、自動採番を指定する
create table fruits (id int primary key auto_increment, name varchar(255) not null unique, fee int default 0);
--deleteを使う
--deleteとは、レコードを削除する
-- 例えば、delete from fruits where id = 1とすると、idが1のレコードを削除する
delete from fruits where id = 1;
--updateを使う
--updateとは、レコードを更新する
-- 例えば、update fruits set name = 'apple' where id = 1とすると、idが1のレコードのnameをappleに更新する
update fruits set name = 'apple' where id = 1;
--insert intoを使う
--insert intoとは、レコードを追加する
-- 例えば、insert into fruits (name, fee) values ('apple', 100)とすると、nameがapple、feeが100のレコードを追加する
insert into fruits (name, fee) values ('apple', 100);
--alter tableを使う
--alter tableとは、テーブルを変更する
-- 例えば、alter table fruits add column price int default 0とすると、fruitsテーブルにpriceカラムを追加する
alter table fruits add column price int default 0;
--selectを使う
--selectとは、レコードを取得する
-- 例えば、select * from fruitsとすると、fruitsテーブルのレコードを取得する
select * from fruits;
--whereを使う
--whereとは、条件を指定する
-- 例えば、select * from fruits where id = 1とすると、idが1のレコードを取得する
select * from fruits where id = 1;
--full joinを使う
--full joinとは、全結合を指定する
-- 例えば、select * from fruits full join fruits2 on fruits.id = fruits2.idとすると、fruitsテーブルとfruits2テーブルを全結合する
select * from fruits full join fruits2 on fruits.id = fruits2.id;
--cross joinを使う
--cross joinとは、直積結合を指定する
-- 例えば、select * from fruits cross join fruits2とすると、fruitsテーブルとfruits2テーブルを直積結合する
select * from fruits cross join fruits2;
--findManyを使う
--findManyとは、複数レコードを取得する
-- 例えば、findMany()とすると、複数レコードを取得する
$fruits = $db->fruits()->findMany();
--findOneを使う
--findOneとは、1レコードを取得する
-- 例えば、findOne(1)とすると、idが1のレコードを取得する
$fruit = $db->fruits()->findOne(1);
--insertを使う
--insertとは、レコードを追加する
-- 例えば、insert(['name' => 'apple', 'fee' => 100])とすると、nameがapple、feeが100のレコードを追加する
$db->fruits()->insert(['name' => 'apple', 'fee' => 100]);
--updateを使う
--updateとは、レコードを更新する
-- 例えば、update(['name' => 'apple', 'fee' => 100])とすると、nameがapple、feeが100のレコードを更新する
$db->fruits()->update(['name' => 'apple', 'fee' => 100]);
--deleteを使う
--deleteとは、レコードを削除する
-- 例えば、delete()とすると、レコードを削除する
$db->fruits()->delete();
--whereを使う
--whereとは、条件を指定する
-- 例えば、where('id', 1)とすると、idが1のレコードを取得する
$fruit = $db->fruits()->where('id', 1)->findOne();
--cross joinを使う
--cross joinとは、直積結合を指定する
-- 例えば、crossJoin('fruits2')とすると、fruitsテーブルとfruits2テーブルを直積結合する
$fruits = $db->fruits()->crossJoin('fruits2')->findMany();
--left joinを使う
--left joinとは、左結合を指定する
-- 例えば、leftJoin('fruits2', 'fruits.id', '=', 'fruits2.id')とすると、fruitsテーブルとfruits2テーブルを左結合する
SELECT * 
FROM fruits
LEFT JOIN color
ON fruits.id = color.fruit_id;

--right joinを使う
--right joinとは、右結合を指定する
-- 例えば、rightJoin('fruits2', 'fruits.id', '=', 'fruits2.id')とすると、fruitsテーブルとfruits2テーブルを右結合する
SELECT *
FROM fruits
RIGHT JOIN color
ON fruits.id = color.fruit_id;
--full joinを使う
--full joinとは、全結合を指定する
-- 例えば、fullJoin('fruits2', 'fruits.id', '=', 'fruits2.id')とすると、fruitsテーブルとfruits2テーブルを全結合する
fullJoin('fruits2', 'fruits.id', '=', 'fruits2.id')
--whereを使う
--whereとは、条件を指定する
-- 例えば、where('id', 1)とすると、idが1のレコードを取得する
$fruit = $db->fruits()->where('id', 1)->findOne();
--alter tableを使う
--alter tableとは、テーブルを変更する
-- 例えば、alter table fruits add column price int default 0とすると、fruitsテーブルにpriceカラムを追加する
alter table fruits add column price int default 0;
--selectを使う
--selectとは、レコードを取得する
-- 例えば、select * from fruitsとすると、fruitsテーブルのレコードを取得する
select * from fruits;
--whereを使う
--whereとは、条件を指定する
-- 例えば、select * from fruits where id = 1とすると、idが1のレコードを取得する
select * from fruits where id = 1;
--full joinを使う
--full joinとは、全結合を指定する
-- 例えば、select * from fruits full join fruits2 on fruits.id = fruits2.idとすると、fruitsテーブルとfruits2テーブルを全結合する
select * from fruits full join fruits2 on fruits.id = fruits2.id;
--cross joinを使う
--cross joinとは、直積結合を指定する
-- 例えば、select * from fruits cross join fruits2とすると、fruitsテーブルとfruits2テーブルを直積結合する
select * from fruits cross join fruits2;
--left joinを使う
--left joinとは、左結合を指定する
-- 例えば、select * from fruits left join fruits2 on fruits.id = fruits2.idとすると、fruitsテーブルとfruits2テーブルを左結合する
select * from fruits left join fruits2 on fruits.id = fruits2.id;
--right joinを使う
--right joinとは、右結合を指定する
-- 例えば、select * from fruits right join fruits2 on fruits.id = fruits2.idとすると、fruitsテーブルとfruits2テーブルを右結合する
select * from fruits right join fruits2 on fruits.id = fruits2.id;
--insertを使う
--insertとは、レコードを追加する
-- 例えば、insert into fruits (name, fee) values ('apple', 100)とすると、nameがapple、feeが100のレコードを追加する
insert into fruits (name, fee) values ('apple', 100);
--updateを使う 
--updateとは、レコードを更新する
-- 例えば、update fruits set name = 'apple', fee = 100 where id = 1とすると、idが1のレコードのnameをapple、feeを100に更新する
update fruits set name = 'apple', fee = 100 where id = 1;
--deleteを使う
--deleteとは、レコードを削除する
-- 例えば、delete from fruits where id = 1とすると、idが1のレコードを削除する
delete from fruits where id = 1;
--drop tableを使う
--drop tableとは、テーブルを削除する
-- 例えば、drop table fruitsとすると、fruitsテーブルを削除する
drop table fruits;
--create tableを使う
--create tableとは、テーブルを作成する
-- 例えば、create table fruits (id int primary key, name varchar(255), fee int)とすると、fruitsテーブルを作成する
create table fruits (id int primary key, name varchar(255), fee int);
--create databaseを使う
--create databaseとは、データベースを作成する
-- 例えば、create database fruitsとすると、fruitsデータベースを作成する
create database fruits;
--drop databaseを使う
--drop databaseとは、データベースを削除する
-- 例えば、drop database fruitsとすると、fruitsデータベースを削除する
drop database fruits;
--truncate tableを使う
--truncate tableとは、テーブルを空にする
-- 例えば、truncate table fruitsとすると、fruitsテーブルを空にする
truncate table fruits;
--rename tableを使う
--rename tableとは、テーブル名を変更する
-- 例えば、rename table fruits to fruits2とすると、fruitsテーブルの名前をfruits2に変更する
rename table fruits to fruits2;
--rename databaseを使う
--rename databaseとは、データベース名を変更する
-- 例えば、rename database fruits to fruits2とすると、fruitsデータベースの名前をfruits2に変更する
rename database fruits to fruits2;
--show databasesを使う
--show databasesとは、データベースの一覧を表示する
-- 例えば、show databasesとすると、データベースの一覧を表示する
show databases;
--show tablesを使う
