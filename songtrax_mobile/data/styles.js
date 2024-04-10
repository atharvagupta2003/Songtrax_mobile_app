// Light and Dark colour schemes
export const colors = {
	purpleColorLighter: "#A42DE8",
	blueColorLighter: "#318AFF",
	blueColorDarker: "#2D3DE8",
	blackColorTranslucentLess: "rgba(0,0,0,0.35)",
	blackColorTranslucentMore: "rgba(0,0,0,0.7)",
    whiteColor: "#ffffff",
    whiteColorTranslucent: "rgba(255,255,255, 0.5)",
	"light" : {
		bgColor: "#ffffff",
		fgColor: "#800080",
		fgColorLighter: "rgba(128,0,128,0.5)",
		headerTextColor: "#ffffff",
		textColor: '#b6b6b6',
	},
	"dark" : {
		bgColor: "#422142",
		fgColor: "#f0c4f0",
		fgColorLighter: "rgba(210,169,210,0.5)",
		headerTextColor: "#f0c4f0",
		textColor: "rgba(255,255,255, 0.5)",
	}
};

const styles = {
    nearbyAndPlayContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 0
    },
    subHeading: {
        fontSize: 14,
        paddingBottom: 25
    },
    songName: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 0
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", 
    },
    locationHeading: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 6
    },
    playButton: {
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
    },
    locationIcon: {
        width: 35,
        height: 105,
    },
    currentLocation: {
        marginBottom: 10
    }, 
    ratingComponent: {
        paddingTop: 15,
    },
    profileContainer: {
        padding: 20,
        flex: 1
    },
    input: {
        marginTop: 20,
        borderRadius: 5,
        textAlign: "center",
        height: 40
    },
    photoEmptyView: {
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: "dashed",
    },
    photoFullImage: {
        width: "100%",
        borderRadius: 10
    },
    addPhoto: {
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
    },
    changePhoto: {
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
    }
}


