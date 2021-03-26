---
layout: article
permalink: 'apo/rules-and-conditions.html'
title: Define rules and conditions for your options
eleventyNavigation:
  key: apo-rules-and-conditions
  title: Define rules and conditions for your options
  parent: apo
section: using-the-app
tags: apo
sortOrder: 8
---

# Define rules and conditions for your options

We’ve developed a brand-new enhanced ‘conditional logic’ functionality. It allows you to set rules that would define not only options availability (hide/show), but you can set specific price, cost, SKU, weight, or country of origin for particular combinations of options.

Steps:

1. From the option set admin panel, navigate to the **Rules** tab.
1. Click the **Add new rule** green button.
1. Click the **+ Add option** link.
1. From the **Select option** dropdown menu, choose the target option.
1. Choose a condition operator from the second dropdown. It can be either **is** or **is not**. 
1. Choose the value of the target option you selected in the first dropdown.
1. Optional: If you need to add more conditions, please click the **+ Add option** link again and perform the same steps described above.
1. If you added more than one condition, you need to set a condition type. Navigate to the **Need all/any of these conditions to trigger action** setting above the conditions and select either **all** or **any** condition type.
1. Click the **+ Add action** link.
1. Expand the dropdown with available actions and choose an appropriate one.
1. After you choose an action (except the Hide options or values), please add the corresponding attribute to the field that shows up.
   - If you choose an action like "set" attribute (**Set price**, for example) this attribute will overwrite the corresponding original product attribute.
   - If you choose an action like **Increase/decrease** attribute, the attribute will be added/deducted to/from the original attribute.
   - If you choose the **Hide options or values** action, click the **+ Add option** link.
1. Select the dependable option from the **Select option** dropdown menu.
1. Select either **All** or particular option value(s) from the **Select value** dropdown menu.

The app allows creating an unlimited number of rules, to add a new rule click the **Add new rule** green button again and follow the steps described above.