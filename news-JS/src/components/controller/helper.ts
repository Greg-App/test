
function checkedQuerySelector(
  parent: Element | Document| DocumentFragment, selector: string
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
  
    throw new Error(`Can't find  element with selector name: "${selector}" 
    `);
  }
  return el;
}
/* function safeQuerySelector<T extends ???>(
  parent: Document | Element,
  type: T,
  selector: string,
): ??? {
  // ...
} */

function queryElement<T extends typeof Element>(
  container: Document | Element | DocumentFragment,
  type: T,
  selector: string,
): InstanceType<T> {
  const el = checkedQuerySelector(container, selector);
  if (!(el instanceof type)) { 
        throw new Error(
      `Selector ${selector} matched ${el} which is not an ${type}`
    );
  }
  return el as InstanceType<T>;
}

export default queryElement;