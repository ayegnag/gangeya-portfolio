---
title: Why understanding UX matters as a Dev
description: A developer doesn't just build screens, they build solutions.
image: "/images/blog/golden-ratio.png"
createdAt: 2025-12-25
updatedAt: 2025-12-25
---

![The Golden ratio](/images/blog/golden-ratio.png)

# Why understanding UX matters as a Dev

When I started my career as a developer, I was working on UI for a touchscreen LCD on a wireless device. The UI was written in C and ran directly on firmware. There was no layout engine, no flexbox, no safety net. Each pixel mattered. A single misplaced pixel could make the entire screen feel off - at least to me.

At the time, I didn’t have the vocabulary to explain _why_ it felt wrong. I just knew it did.

Working at a startup helped. It gave me the freedom and responsibility - to make design decisions myself. Since I was deciding how UI elements should appear on the screen, I naturally started digging into the fundamentals behind design and visual perception. Not because I wanted to be a designer, but because I wanted things to _feel right_.

The human mind is incredibly sensitive to patterns and inconsistencies. People may not consciously notice small irregularities, but subconsciously they register them. Those signals affect how a product feels - whether it feels polished, trustworthy, or uncomfortable in a way they can’t quite explain.

That’s why small details in UI matter.

Take something as simple as centering an icon. Should it be geometrically centered, or visually centered based on its center of mass? In many cases, strict geometry looks wrong to the eye. When a UI feels good, it’s often because these subconscious “something is off” alarms never get triggered. The user feels at ease without knowing why.

A well-known example is Google’s “G” icon. It isn’t a perfect circle. The horizontal stroke slightly intrudes to complete the letterform, and the proportions are subtly adjusted. Those imperfections are intentional - they make the icon feel balanced and natural rather than mechanically precise.

Once a developer understands these ideas, design decisions start making sense. You stop treating designs as arbitrary instructions and start seeing them as outcomes of constraints and intent.

There’s also an important shift in mindset here: developers _can_ and _should_ question design decisions - not in a confrontational way, but in a thoughtful one. Questions like:

- Should this element have padding, and how much?
    
- Does this component need equal margins on all sides, or is it creating a visual separation?
    
- Is this section meant to group things together or distinguish them?
    

Understanding concepts like white space, visual hierarchy, and breathing room helps you get things right the first time - without constantly checking the design file for every minor detail.

This becomes especially valuable when designs are incomplete. For example, a design document may define the desktop layout but say nothing about mobile. In those cases, a developer who understands UX can treat the design as a _paradigm_rather than a rigid blueprint, and make reasonable decisions that stay true to the original intent.

Ultimately, this is about understanding the product, not just the UI.

A better developer doesn’t just implement the _what_; they understand the _why_. And once you understand the why, you stop building screens - and start building experiences.