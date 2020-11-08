//
//  StripeEventHandler.m
//  eDance
//
//  Created by highjump on 2020/11/8.
//

#import "StripeEventHandler.h"

@interface StripeEventHandler() 

@end

@implementation StripeEventHandler

static StripeEventHandler *shared = nil;

+ (id)shared {
  return shared;
}

- (id)init {
  self = [super init];
  
  shared = self;
  
  return self;
}


RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"didChangePaymentMethod"];
}


@end
