import { allCars } from "@/data/cars";

export const initialState = {
  price: [50000, 100000],
  miles: [2000, 100000],
  year: [2021, 2025],
  body: "Any Body",
  make: "Any Make",
  model: ["Any Model"],
  fuel: "Any Fuel",
  transmission: "Any Transmission",
  location: "Any Location",
  door: "Any",
  cylinder: "Any Cylinder",
  color: "Any Color",
  drivetrain: "Any Drivetrain",

  features: [],
  filtered: allCars,
  sortingOption: "Sort by (Default)",
  sorted: allCars,
  currentPage: 1,
  itemPerPage: 10,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_MILES":
      return { ...state, miles: action.payload };
      case "SET_MODEL":
        return { ...state, model: Array.isArray(action.payload) ? action.payload : [action.payload] };      
    case "SET_BODY":
      return { ...state, body: action.payload };
    case "SET_MAKE":
      return { ...state, make: action.payload };
    case "SET_FUEL":
      return { ...state, fuel: action.payload };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_DOOR":
      return { ...state, door: action.payload };
    case "SET_CYLINDER":
      return { ...state, cylinder: action.payload };    
    case "SET_DRIVETRAIN":
      return { ...state, drivetrain: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_FEATURES":
      return { ...state, features: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: [...action.payload] };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: [...action.payload] };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...state,
        price: [50000, 100000],
        miles: [2000, 100000],
        year: [2021, 2025],
        body: "Any Body",
        make: "Any Make",
        model: ["Any Model"],
        fuel: "Any Fuel",
        transmission: "Any Transmission",
        location: "Any Location",
        door: "Any",
        cylinder: "Any Cylinder",
        color: "Any Color",
        drivetrain: "Any Drivetrain",

        features: [],
      };
    default:
      return state;
  }
}
