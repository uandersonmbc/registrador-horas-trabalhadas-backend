export const total: string = `
select
	SUM(wh."end"::timestamp - wh."start"::timestamp) AS total
from worked_hours wh
where
	wh.user_id = ? and
	TO_CHAR(wh."start" , replace_types) = ?;
`

export const totalPer: string = `
select
	to_char(wh."start"::timestamp, 'replace_format') as "replace_type_group",
	SUM(wh."end"::timestamp - wh."start"::timestamp) AS total
from worked_hours wh
where
	wh.user_id = ? and
	TO_CHAR(wh."start" , replace_types) = ? and activity_id = 1
group by "replace_type_group";
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
export const totalMonth : string = `
select
	"month",
	amount_hours
from months m2
where m2."year" = ?;
`
