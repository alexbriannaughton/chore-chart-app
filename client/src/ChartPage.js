import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ChartPage() {

    const [memberTasks, setMemberTasks] = useState([])

    const params = useParams()

    useEffect(() => {
        fetch(`/chore_wheels/${params.chartId}`)
        .then((res) => res.json())
        .then((data) => setMemberTasks(data))
    },[])

    function renderMemberTasks() {
        return(
            memberTasks && memberTasks.map((mt) => {
                return (
                    <div>
                        <p>
                            {mt.member.name}: {mt.task.name}
                        </p>
                    </div>
                )
            })
        )
    }


    return (
        <div>
            {renderMemberTasks()}
        </div>
    )
}

export default ChartPage