<!DOCTYPE html>
<html>
<head>
	<title>Styleguide</title>
</head>
<body>
	<nav>
    <ul class="nav-aside">
        <?php $__currentLoopData = $nav; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item => $subitems): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <li><?php echo e($item); ?></li>
            
            <?php $__currentLoopData = $subitems; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $subitem): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            	<li><a href="/<?php echo e($item); ?>/<?php echo e($subitem); ?>"><?php echo e($subitem); ?></a></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </ul>
	</nav>

	 <?php echo $__env->yieldContent('content'); ?>
</body>
</html>