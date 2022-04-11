//Enregistrement du token
db.createView(
	"token_utilisateur",
	"token",
	[
		{$lookup: {from: "utilisateur", localField: "id_utilisateur", foreignField: "_id", as: "utilisateur"}},
		{$unwind: {path: "$utilisateur"}}
	]
)

//Liaison entre commande et utilisateur
db.createView(
	"livraison",
	"commande",
	[
		{$lookup: {from: "utilisateur", localField: "id_client", foreignField: "_id", as: "client"}},
		{$unwind: {path: "$client"}}
	]
)

