import React from "react";
import { Link } from "react-router-dom";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";

// const useStyles = makeStyles((theme) => ({
// gridTile: {
// width: "100%",
// margin: "10px",
// backgroundColor: "rgb(0,0,0,0)",
// },
// img: {
// height: "100%",
// },
// }));

const RecipeTile = ({ recipe }) => {
	// const classes = useStyles();

	return (
		<GridListTile key={recipe.image}>
			<img src={recipe.image} alt={recipe.title} />
			<GridListTileBar
				title={recipe.title}
				subtitle={<span>by: {recipe.author}</span>}
				actionIcon={
					<IconButton
						aria-label={`info about ${recipe.title}`}
						// className={classes.icon}
					>
						<InfoIcon />
					</IconButton>
				}
			/>
		</GridListTile>
		/* <GridListTile
			key={recipe.id}
			name={recipe.id}
			cols={2}
			className={classes.gridTile}
		>
			<Link to={`/recipes/${recipe.id}`} style={{ overflow: "hidden" }}>
				<img src={recipe.image} alt={recipe.title} className={classes.img} />
				<GridListTileBar title={recipe.title} />
			</Link>
		</GridListTile> */
	);
};

export default RecipeTile;
