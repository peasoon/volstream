export const boundTabs = (tabsSelector) => {
  const tabs = document.querySelector(tabsSelector);
  const headings = tabs.querySelectorAll('.heading');
  const contents = tabs.querySelectorAll('.content');
  headings.forEach((heading, index) => {
    heading.addEventListener('click', () => {
      headings.forEach(item => {
        item.classList.remove('selected')
      })
      heading.classList.add('selected')
      contents.forEach(item => {
        item.classList.remove('show')
      })
      contents[index].classList.add('show')
    })
  })
}