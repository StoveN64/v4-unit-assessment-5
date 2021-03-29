SELECT p.id AS post_id, title, content, img, profile_pic, date_created, username AS author_username 
FROM helo_posts p
JOIN helo_users u on u.id = p.author_id
WHERE lower(title) like $1
AND author_id != $2
ORDER BY date_created DESC;