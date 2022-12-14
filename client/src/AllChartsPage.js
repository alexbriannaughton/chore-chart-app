import { Link } from "react-router-dom"


function AllChartsPage({ user }) {

    function renderAllCharts() {
        return (
            user && user.chore_wheels.map((cw) => {
                return (
                    <div>
                        <Link
                            key={cw.id}
                            to={`${cw.id}`}
                        >
                            {cw.name}
                        </Link>
                    </div>
                )
            })
        )
    }

    return (
        <div>
            {renderAllCharts()}
        </div>
    )
}

export default AllChartsPage