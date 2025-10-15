// Custom localized field types
import localizedString from './localizedString'
import localizedText from './localizedText'
import localizedBlockContent from './localizedBlockContent'

// Document types
import homePage from './homePage'
import solutionsPage from './solutionsPage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import faqPage from './faqPage'
import mortgageGlossary from './mortgageGlossary'
import solution from './solution'
import testimonial from './testimonial'
import blogPost from './blogPost'
import guide from './guide'
import video from './video'

export const schemaTypes = [
  // Custom field types (must come first)
  localizedString,
  localizedText,
  localizedBlockContent,
  // Document types
  homePage,
  solutionsPage,
  aboutPage,
  contactPage,
  faqPage,
  mortgageGlossary,
  solution,
  testimonial,
  blogPost,
  guide,
  video,
]
