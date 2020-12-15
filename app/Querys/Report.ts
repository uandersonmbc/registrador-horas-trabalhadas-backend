export const totalMonth: string = `
select
	SUM(wh."end"::timestamp - wh."start"::timestamp) AS total
from worked_hours wh
where
	wh.user_id = ? and
	TO_CHAR(wh."start" , replace_types) = ?;
`

export const totalPerMonth: string = `
select
	to_char(wh."start"::timestamp, 'MM') as "month",
	SUM(wh."end"::timestamp - wh."start"::timestamp) AS total
from worked_hours wh
where
	wh.user_id = ? and
	TO_CHAR(wh."start" , replace_types) = ? and activity_id = 1
group by "month";
`

export const totalPerProjects: string = `
select
	p2."name",
	p2.slug,
	SUM(wh."end"::timestamp - wh."start"::timestamp) AS total
from worked_hours wh
join projects p2 on wh.project_id = p2.id
where
	wh.user_id = ? and
	TO_CHAR(wh."start" , replace_types) = ? and activity_id = 1
group by p2."name", slug;
`

export const totalPerActivities = `
select
	a2."name",
	a2.slug,
	SUM(wh."end"::timestamp - wh."start"::timestamp) AS total
from worked_hours wh
join activities a2 on a2.id = wh.activity_id
where
	wh.user_id = ? and
	TO_CHAR(wh."start" , replace_types) = ? and activity_id <> ?
group by a2."name", slug;
`
