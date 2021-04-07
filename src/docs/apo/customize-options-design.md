---
layout: article
permalink: 'apo/customize-options-design.html'
title: Customize the design of options on product page
eleventyNavigation:
  key: apo-customize-options-design
  title: Customize the design of options on product page
  parent: apo
section: getting-started
tags: apo
sortOrder: 3
---

# Customize the design of options on product page

Our app allows you to customize the design and layout of your options, but it’s pretty technical and you’ll need to write some CSS to do that. If you need help with this - feel free to contact us. 

Steps for customizing particular options individually:

1. On the app's menu to the right click on **Settings**.
1. In section called **Formats and styling** locate the card called **Styling** and select the checkbox called **Add custom CSS**.
1. In the text box that appears you can provide CSS classes that you want to use to style your options. 
1. When you're done with writing up CSS classes, you need to assign those classes to your specific options. To do that, in the app's menu click on **Option sets** and select the option set which contains options that you're looking to redesign. 
1. Find and expand that option, and then click on the **more settings** link. 
1. At the bottom of the section that appears you will see the **CSS classes** input box where you can add some or all of the classes that you've previousle added on the **Settings** page.  


Steps for applying styling to all options for the whole app: 

1. [Create some options](create-option-set.html) and [assign them to a product](add-options-via-option-sets.html). Now you can study HTML and CSS structure of app's options by viewing the code of that section in your browser via Inspect Element mode. This will tell you which of our classes you'll need to override with your custom CSS. 
1. Now on the app's menu click on **Settings** .
1. In section called **Formats and styling** locate the card called **Styling** and select the checkbox called **Add custom CSS**.
1. In the text box that appears you can provide CSS code that uses the names of our classes to add or override some styling in them. 
