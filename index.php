<?php get_header() ?>

<div id="acn_int" class="l-wrap" >
  <? echo get_user_location() ?>
<div class="contact-form" data-props='{"country": "Germany"}'></div>
<div class="contact-form"></div>
<div class="contact-form"></div>
<div class="row">
  <div class="col-12-l col-2-m col-3">
    <div style="background: red">nea1</div>
  </div>
  <div class="col-12-l col-2-m col-3">
    <div style="background: red">nea2</div>
  </div>
  <div class="col-12-l col-2-m col-3">
    <div style="background: red">nea3</div>
  </div>
  <div class="col-12-l col-2-m col-3">
    <div style="background: red">nea4</div>
  </div>
  <div class="col-12-l col-2-m col-3">
    <div style="background: red">nea5</div>
  </div>
</div>
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <?php the_content() ?>
    
  <?php endwhile; else : ?>
    <h1>
    <?php echo gett('404') ?>
    </h1>
  <?php endif; ?>
</div>

<?php get_footer() ?>
