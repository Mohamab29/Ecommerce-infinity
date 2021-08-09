import ProductModel from "../Models/ProductModel";


export class ProductsState {
  public products: ProductModel[] = [];
}


export enum ProductsActionType {
  ProductsDownloaded = "ProductsDownloaded ",
  ProductAdded = "ProductAdded",
}


export interface ProductsAction {
  type: ProductsActionType; 
  payload: any;
}

export function productsReducer(
  currentState: ProductsState = new ProductsState(),
  action: ProductsAction
): ProductsState {

  const newState = { ...currentState };


  switch (action.type) {
    case ProductsActionType.ProductsDownloaded:
      newState.products = action.payload;
      break;
    case ProductsActionType.ProductAdded:
      newState.products.push(action.payload);
      break;
  }

  return newState;
}


