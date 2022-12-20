import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Circle from './components/Circle'


function ChartPage() {

    const [memberTasks, setMemberTasks] = useState([])

    const [errors, setErrors] = useState([])

    const params = useParams()

    useEffect(() => {
        fetch(`/chore_wheels/${params.chartId}`)
            .then((res) => {
                if (res.ok) {
                    res.json().then((memberTasks) => setMemberTasks(memberTasks))
                } else {
                    res.json().then((err) => setErrors(err.errors))
                }
            })
  
    }, [])

    function renderMemberTasks() {
        return (
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
            {/* {renderMemberTasks()} */}
            {errors.length > 0 ? <h1>not authorized</h1> : <Circle
                memberTasks={memberTasks}
                setMemberTasks={setMemberTasks}

            />}
            
        </div>
    )
}



export default ChartPage