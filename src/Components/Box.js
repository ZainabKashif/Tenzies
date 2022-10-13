import React from "react";
const Box = (prop) => {
    const styles = { backgroundColor: prop.isHeld ? "#59E391" : "white" }

    return (
        <div className="numbers" style={styles} onClick={prop.holdDice}>
            <h1>{prop.value}</h1>
        </div>
    )
}
export default Box;