SELECT *
FROM fruits
WHERE id > 2
ORDER BY id DESC;
--selectを使う
--idが2より大きいものを選択   
--idを降順に並べる
select * from fruits where id > 2 order by id desc;
SELECT * 
FROM fruits 
WHERE name 
LIKE 'ba%';
--LIKEを使う
--nameの先頭がbaで始まるものを選択
select * from fruits where name like 'ba%';

