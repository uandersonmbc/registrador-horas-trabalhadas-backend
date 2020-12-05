export const dayWeek: string = `
select wh.id, t2."name" as activity, p2."name" as project,project_id, activity_id, "start", "end", (wh."end"::timestamp - wh."start"::timestamp) AS hours from worked_hours wh
join "activities" t2 on wh.activity_id = t2.id
join projects p2 on wh.project_id = p2.id
where wh.user_id = ? and wh."start"::date = ?
`

export const week: string = `
select
	SUM(case when wh.activity_id = 1 then  wh."end"::timestamp - wh."start"::timestamp else '00:00:00' end) AS total,
	SUM(case when wh.activity_id = 2 then  wh."end"::timestamp - wh."start"::timestamp else '00:00:00' end) AS coffee,
	SUM(case when wh.activity_id = 3 then  wh."end"::timestamp - wh."start"::timestamp else '00:00:00' end) AS lunch,
	SUM(case when wh.activity_id = 4 then  wh."end"::timestamp - wh."start"::timestamp else '00:00:00' end) AS "absent",
	SUM(case when wh.activity_id = ANY ('{2,3,4}'::int[]) then  wh."end"::timestamp - wh."start"::timestamp else '00:00:00' END) AS pause,
	min(wh."start") as start_date_timestamp,
	max(wh."end") as end_date_timestamp
from worked_hours wh
where wh.user_id = ? and "start" between ? and ?
group by wh."start"::date
`

export const weekTotal: string = `
select to_char(wh."start"::timestamp, 'IW') as "week", SUM(wh."end"::timestamp - wh."start"::timestamp) AS total from worked_hours wh where wh.user_id = ? and "start" between ? and ? and project_id = 1 and activity_id = 1 group by "week";
`
