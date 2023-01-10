import { useState } from 'react'

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div>
      <div className="flex justify-center">
        {children.map((child, index) => (
          <div
            key={index}
            className={`px-4 py-2 cursor-pointer text-center ${index === activeTab ? 'border-b-2 border-[#818CF8]' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      <div className="pt-4">
        {children[activeTab]}
      </div>
    </div>
  )
}


const TabContainer = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export const Tab = ({ title, children, onClick }) => {
  return (
    <div className="pt-6" onClick={onClick}>
      <TabContainer>{children}</TabContainer>
    </div>
  )
}

export default Tabs
