enum PasswordStrengths {
  TOO_WEAK = 'too-weak',
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
}

const displayPasswordStrength = (
  htmlDatasetName: string,
  passwordStrength: PasswordStrengths,
): void => {
  const templateSelector = getTemplateSelector(
    htmlDatasetName,
    passwordStrength,
  )
  const templateElement = getTemplateElement(templateSelector)
  const templateElementParent = getTemplateParent(templateElement)

  removeNonTemplateElements(templateElementParent)

  const templateContent = getTemplateContent(templateElement)
  appendTemplateContent(templateElementParent, templateContent)
}

const getTemplateSelector = (
  htmlDatasetName: string,
  passwordStrength: string,
): string => {
  return `[${htmlDatasetName}="${passwordStrength}"]`
}

const getTemplateElement = (templateSelector: string): HTMLTemplateElement => {
  return document.querySelector<HTMLTemplateElement>(templateSelector)
}

const getTemplateParent = (
  templateElement: HTMLTemplateElement,
): ParentNode => {
  return templateElement.parentNode
}

const removeNonTemplateElements = (parentNode: ParentNode): void => {
  parentNode.querySelectorAll('*:not(template)').forEach((e) => e.remove())
}

const getTemplateContent = (templateElement: HTMLTemplateElement): Node => {
  return templateElement.content.cloneNode(true)
}

const appendTemplateContent = (
  parentNode: ParentNode,
  templateContent: Node,
): void => {
  parentNode.appendChild(templateContent)
}

export default displayPasswordStrength
export { PasswordStrengths }
