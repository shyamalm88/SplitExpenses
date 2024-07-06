import { Icon } from "@react-native-material/core";
import { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  category: string;
  size?: number;
};

const Category = ({ category, size }: Props) => {
  let icon = "";
  let utilCategory = "";
  const renderSwitch = () => {
    switch (category) {
      case "cleaning":
        icon = "vacuum-outline";
        utilCategory = "utilities";
        break;
      case "electricity":
        icon = "lightbulb-variant-outline";
        utilCategory = "utilities";
        break;
      case "gas":
        icon = "gas-burner";
        utilCategory = "utilities";
      case "water":
        icon = "water-outline";
        utilCategory = "utilities";
      case "internet":
        icon = "wifi";
        utilCategory = "utilities";
        break;
      case "trash":
        icon = "trash-can-outline";
        utilCategory = "utilities";
        break;
      case "other":
        icon = "trash-can-outline";
        utilCategory = "utilities";
        break;
      case "games":
        icon = "gamepad-variant-outline";
        utilCategory = "entertainment";
        break;
      case "movies":
        icon = "movie-open-outline";
        utilCategory = "entertainment";
        break;
      case "music":
        icon = "music-note-outline";
        utilCategory = "entertainment";
        break;
      case "sports":
        icon = "football";
        utilCategory = "entertainment";
        break;
      case "other":
        icon = "drama-masks";
        utilCategory = "entertainment";
        break;
      case "dineout":
        icon = "silverware";
        utilCategory = "food&drink";
        break;
      case "groceries":
        icon = "cart-outline";
        utilCategory = "food&drink";
        break;
      case "liquor":
        icon = "liquor";
        utilCategory = "food&drink";
        break;
      case "other":
        icon = "food-outline";
        utilCategory = "food&drink";
        break;
      case "electronics":
        icon = "flash-outline";
        utilCategory = "home";
        break;
      case "furniture":
        icon = "table-furniture";
        utilCategory = "home";
        break;
      case "household":
        icon = "home-lightning-bolt-outline";
        utilCategory = "home";
        break;
      case "maintenance":
        icon = "wrench-clock";
        utilCategory = "home";
        break;
      case "mortgage":
        icon = "home-lock";
        utilCategory = "home";
        break;
      case "pets":
        icon = "paw-outline";
        utilCategory = "home";
        break;
      case "other":
        icon = "home-lightbulb-outline";
        utilCategory = "home";
        break;
      case "rent":
        icon = "home-roof";
        utilCategory = "home";
        break;
      case "services":
        icon = "room-service-outline";
        utilCategory = "home";
        break;
      case "bicycle":
        icon = "bicycle";
        utilCategory = "transport";
        break;
      case "bus":
        icon = "bus";
        utilCategory = "transport";
        break;
      case "train":
        icon = "train";
        utilCategory = "transport";
        break;
      case "car":
        icon = "car";
        utilCategory = "transport";
        break;
      case "airplane":
        icon = "airplane";
        utilCategory = "transport";
        break;
      case "fuel":
        icon = "gas-station";
        utilCategory = "transport";
        break;
      case "hotel":
        icon = "bed-outline";
        utilCategory = "transport";
        break;
      case "parking":
        icon = "parking";
        utilCategory = "transport";
        break;
      case "taxi":
        icon = "taxi";
        utilCategory = "transport";
        break;
      case "other":
        icon = "train-car";
        utilCategory = "transport";
        break;
      case "childcare":
        icon = "account-child-outline";
        utilCategory = "life";
        break;
      case "clothing":
        icon = "hanger";
        utilCategory = "life";
        break;
      case "education":
        icon = "school-outline";
        utilCategory = "life";
        break;
      case "gifts":
        icon = "gift-outline";
        utilCategory = "life";
        break;
      case "insurance":
        icon = "shield-check-outline";
        utilCategory = "life";
        break;
      case "medical":
        icon = "stethoscope";
        utilCategory = "life";
        break;
      case "tax":
        icon = "calculator-variant-outline";
        utilCategory = "life";
        break;
      case "other":
        icon = "file-document-multiple-outline";
        utilCategory = "life";
        break;
      default:
        icon = "text-box-outline";
        utilCategory = "uncategorized";
        break;
    }
    return <Icon size={size ? size : 24} name={icon} />;
  };
  return (
    <Pressable>
      <View
        style={{
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            utilCategory === "utilities"
              ? "lightgreen"
              : utilCategory === "entertainment"
              ? "lightblue"
              : utilCategory === "food&drink"
              ? "lightpurple"
              : utilCategory === "home"
              ? "lightbrown"
              : utilCategory === "transport"
              ? "lightbrown"
              : utilCategory === "life"
              ? "crimson"
              : "pink",
        }}
      >
        {renderSwitch()}
      </View>
    </Pressable>
  );
};

export default memo(Category);
