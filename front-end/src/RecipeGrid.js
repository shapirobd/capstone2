import React from "react";
import { Link } from "react-router-dom";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	gridList: {
		width: "75%",
	},
}));

const RecipeGrid = ({ feed }) => {
	const classes = useStyles();
	return (
		<GridList className={classes.gridList} cols={3}>
			{/* <GridListTile cols={3} style={{ height: "auto" }}>
						<ListSubheader component="div">Recipes!</ListSubheader>
					</GridListTile> */}
			{feed.map((recipe) => (
				<Link to={`/recipe/${recipe.id}`}>
					<GridListTile key={recipe.id} id={recipe.id} cols={1}>
						<img src={recipe.image} />
						<GridListTileBar
							title={recipe.title}
							// subtitle={<span>by: {tile.author}</span>}
							// actionIcon={
							// 	<IconButton
							// 		aria-label={`info about ${recipe.name}`}
							// 		className={classes.icon}
							// 	>
							// 		<InfoIcon />
							// 	</IconButton>
							// }
						/>
					</GridListTile>
				</Link>
			))}
		</GridList>
	);
};

export default RecipeGrid;
