import styled from "styled-components"
import React, { useState } from "react";


function Checkboxes({ memberTasks }) {

    return (
        <CheckBoxDiv>
            {memberTasks.map((mt) => {
                return <>
                    <label>Did {mt.member.name} accomplish "{mt.task.name}" duty?</label>
                    <input
                        type="checkbox">
                        
                    </input>
                    <br></br>
                </>
            })}
        </CheckBoxDiv>
    )
};

const CheckBoxDiv = styled.div`
    position: absolute;
    bottom: 0;
`

export default Checkboxes;