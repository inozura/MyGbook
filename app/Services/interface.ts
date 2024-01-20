interface ReadingModes {
  text: boolean
  image: boolean
}

interface PanelizationSummary {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
  small: string
  medium: string
  large: string
  extraLarge: string
}

interface VolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  readingModes: ReadingModes
  pageCount: number
  printedPageCount: number
  printType: string
  categories: string[]
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
}

interface ListPrice {
  amount: number
  currencyCode: string
}

interface RetailPrice {
  amount: number
  currencyCode: string
}

interface Offer {
  finskyOfferType: number
  listPrice: ListPrice
  retailPrice: RetailPrice
}

interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
  listPrice: ListPrice
  retailPrice: RetailPrice
  buyLink: string
  offers: Offer[]
}

interface Epub {
  isAvailable: boolean
  acsTokenLink: string
}

interface Pdf {
  isAvailable: boolean
}

interface AccessInfo {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: Epub
  pdf: Pdf
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

interface Layer {
  layerId: string
  volumeAnnotationsVersion: string
}

interface LayerInfo {
  layers: Layer[]
}

export interface GbookInterface {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  layerInfo: LayerInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
}
